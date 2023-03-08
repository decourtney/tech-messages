const router = require('express').Router();
const { Post, User, MainPost } = require('../../models');
const Handlebars = require('handlebars');
const { format_date } = require('../../utils/helpers')

router.post('/', async (req, res) => {
  try {
    const postContentData = await MainPost.findOne({
      where: {
        title: req.body.title
      },
      include: [
        {
          model: User,
          where: { username: req.body.username },
          attributes: ['username'],
        },
        {
          model: Post,
          attributes: [
            'date_created',
            'content',
            'is_mainpost',
          ],
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]
        }
      ],
    });

    const contentData = postContentData.get({ plain: true });
    const { title, user: { username }, posts } = contentData;
    const { date_created, content } = posts.shift();
    const formatted_date = format_date(date_created);
    const mainPostContent = {title, username, formatted_date, content};
    // console.log(posts)

    const mainContentTemplate = Handlebars.compile(`
    <section id="mainPost" class="border-b-2 border-blue-200">
        <div id = "postContentHeader">
          <div class="flex justify-between items-center">
            <h2 class="font-semibold text-3xl py-5">{{results.title}}</h2>
            <div>
              <button type="button"
                class="inline-block px-3 pb-1 bg-black text-blue-300 leading-tight uppercase rounded shadow-md hover:bg-blue-300 hover:text-slate-900 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
                <a href="">
                  <span class="text-xs font-semibold">Delete</span></a></button>           
            </div>
          </div>
          <div class="flex items-center">
            <span class="shrink-0"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10"
                alt="Avatar">
            </span>
            <div class="px-2">
              <p>Started by <span id="createdbyName" class="text-blue-600 font-medium">{{content.user.username}}</span></p>
              <p>on <span id="createdbyDate" class="font-semibold">{{mainContent.date_created}}</span></p>
          </div>
        </div>
      </div >

      <div id="postContent">
        <div class="mt-4">
          <p id="mainContent">
          {{mainContent.content}}
          </p>
        </div>
      </div>

      <div class="flex" id="postContentFooter">
        <div class="flex pt-5 pb-10 mr-5">
        <button class="shrink-0 rounded-full p-1 mx-2 shadow-lg bg-blue-300 hover:bg-blue-400 active:shadow-none">
          <span><img src="/images/reply_FILL0_wght400_GRAD0_opsz48.svg"
              class="rounded-full w-5" alt="Reply">
          </span>
        </button>
        <p>Reply</p>
        </div>

        <div class="flex pt-5 pb-10 mr-5">
          <span class="shrink-0 rounded-full p-1 mx-2 bg-gray-300"><img
              src="/images/format_quote_FILL0_wght400_GRAD0_opsz48.svg" class="rounded-full w-5" alt="Quote">
          </span>
          <p>Quote</p>
        </div>
      </div>
    </section>
    `);

    const postsContentTemplate = Handlebars.compile(`
      {{#each results}}
      <section id="postReply" class="my-5 border-b-2 border-blue-200">
        <div class="flex items-center">
          <span class="shrink-0"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10"
            alt="Avatar">
          </span>
          <div class="px-2">
            <p><span class="text-blue-600 font-medium">{{user.username}}</span></p>
            <p>on <span class="font-semibold">{{date_created}}</span></p>
          </div>
        </div>

        <div id="postContent">
          <div class="my-4">
            <p>
            {{content}}
            </p>
          </div>
        </div>
      </section>
      {{/each}}
    `);

    let threadContentHTML = mainContentTemplate({ results: mainPostContent }).toString();
    threadContentHTML += postsContentTemplate({results: posts}).toString();
console.log(threadContentHTML)
    res.status(200).send(threadContentHTML)
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

module.exports = router;
