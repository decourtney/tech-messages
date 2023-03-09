const router = require('express').Router();
const { Post, User, MainPost } = require('../../models');
const Handlebars = require('handlebars');
const { format_date } = require('../../utils/helpers');

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
            'id',
            'date_created',
            'content',
            'is_mainpost',
          ],
          include: [
            {
              model: User,
              attributes: ['id', 'username']
            }
          ]
        }
      ],
    });

    const contentData = postContentData.get({ plain: true });
    // console.log(contentData);

    // deconstruct DB data ** Might need to grab the thread title's ID for deletion
    const { id: threadID, title, user: { username }, posts } = contentData;

    // Grab the first post which is the main threads post contents
    const { user: { id }, date_created, content } = posts.shift();
    const mainPostContent = { threadID, id, title, username, date_created, content };
    console.log(posts);
    // console.log(mainPostContent.id);

    // Create handlebars template
    const mainContentTemplate = Handlebars.compile(`
    <section id="thread">
      <div id="mainPost" class="border-b-2 border-blue-200">
        <div id = "postContentHeader">
          <div class="flex justify-between items-center">
            <h2 class="font-semibold text-3xl py-5">{{mainPostContent.title}}</h2>
            {{#compare mainPostContent.id currentUserID}}
            <div>
              <button id="main-post" type="button" data-postid={{mainPostContent.threadID}}
                class="del-btn inline-block px-3 pb-1 bg-black text-blue-300 leading-tight uppercase rounded shadow-md hover:bg-blue-300 hover:text-slate-900 hover:shadow-lg active:outline-none active:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
                  <span class="text-xs font-semibold pointer-events-none">Delete</span></button>           
            </div>
            {{/compare}}
          </div>
          <div class="flex items-center">
            <span class="shrink-0"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10"
                alt="Avatar">
            </span>
            <div class="px-2">
              <p>Started by <span id="createdbyName" class="text-blue-600 font-medium">{{mainPostContent.username}}</span></p>
              <p>on <span id="createdbyDate" class="font-semibold">{{format_date mainPostContent.date_created}}</span></p>
            </div>
          </div>
        </div>

        <div id="postContent">
          <div class="mt-4">
            <p id="mainContent">
            {{mainPostContent.content}}
            </p>
          </div>
        </div>

        <div class="flex" id="postContentFooter">
          <div class="flex pt-5 pb-10 mr-5">
          <button id="reply-btn" type="button" data-postid={{mainPostContent.threadID}} 
            class="reply-btn shrink-0 rounded-full p-1 mx-2 shadow-lg bg-blue-300 hover:bg-blue-400 active:shadow-none">
            <span class="pointer-events-none"><img src="/images/reply_FILL0_wght400_GRAD0_opsz48.svg"
                class="rounded-full w-5 pointer-events-none" alt="Reply">
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
      </div>

      {{#each posts}}  
      <div id="postReply" class="my-5 border-b-2 border-blue-200">
        <div class="flex items-center">
          <span class="shrink-0"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10"
            alt="Avatar">
          </span>
          <div class="flex justify-between items-center w-full">
            <div class="px-2">
              <p><span class="text-blue-600 font-medium">{{user.username}}</span></p>
              <p>on <span class="font-semibold">{{../format_date date_created}}</span></p>
            </div>
            {{#compare user.id ../currentUserID}}
            <div>
              <button id="post" type="button" data-postid={{id}}
                class="del-btn inline-block px-3 pb-1 bg-black text-blue-300 leading-tight uppercase rounded shadow-md hover:bg-blue-300 hover:text-slate-900 hover:shadow-lg active:outline-none active:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
                  <span class="text-xs font-semibold pointer-events-none">Delete</span></button>
            </div>
            {{/compare}}
          </div>
        </div>

        <div id="postContent">
          <div class="my-4">
            <p>
            {{content}}
            </p>
          </div>
        </div>
      </div>
      {{/each}}
    </section>
  `);

    // Create HTML with template
    const threadContentHTML = mainContentTemplate({ mainPostContent: mainPostContent, posts: posts, format_date: format_date, currentUserID: req.session.user_id }).toString();
    // console.log(threadContentHTML);

    res.status(200).send(threadContentHTML);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
