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
    const { user: { id }, id: postid, date_created, content } = posts.shift();
    const mainPostContent = { threadID, id, title, username, postid, date_created, content };
    console.log(posts);
    // console.log(mainPostContent.id);

    // Create handlebars template
    const mainContentTemplate = Handlebars.compile(`
    <section id="thread">

      <div id="mainPost" class="border-b-2 border-blue-200">
        <div id="postContentHeader">

          <div class="flex justify-between items-center mb-2">
            <h2 class="font-semibold text-lg md:text-3xl leading-none">{{mainPostContent.title}}</h2>

            {{#compare mainPostContent.id currentUserID}}
            <div>
              <button id="main-post" type="button" data-postid={{mainPostContent.threadID}}
              class="del-btn flex align-middle px-2 bg-black text-blue-300 uppercase rounded shadow-md hover:bg-blue-300 hover:text-slate-900 hover:shadow-lg active:outline-none active:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
                  <span class="text-xs font-semibold pointer-events-none">Del</span></button>           
            </div>
            {{/compare}}
          </div>

          <div class="flex items-center">
            <span class="shrink-0"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" 
            class="rounded-full w-8 md:w10" alt="Avatar">
            </span>
            <div class="px-2 text-xs md:text-base">
              <p>Started by <span id="createdbyName" class="text-blue-600 font-medium">{{mainPostContent.username}}</span></p>
              <p>on <span id="createdbyDate" class="font-semibold">{{format_date mainPostContent.date_created}}</span></p>
            </div>
          </div>
        </div>

        <div id="postContent" data-postid={{mainPostContent.postid}}>
          <div class="mt-2 md:mt-4">
            <p id="content" class="content">
              <span class="text-sm md:text-base">{{mainPostContent.content}}</span>

              {{#compare mainPostContent.id currentUserID}}
              <div class="flex justify-end mb-4">
                <p class="edit-post text-xs font-semibold mr-2 cursor-pointer text-slate-400 hover:text-slate-700 active:text-slate-400 duration-150 ease-in-out">
                  <span class=" pointer-events-none">edit</span>
                </p>
              </div>
              {{/compare}}

            </p>
          </div>
        </div>

        <div id="postContentFooter" class="flex pt-2 md:pt-5 pb-2 md:pb-5">
          <div class="flex md:pr-4">
            <button id="reply-btn" type="button" data-postid={{mainPostContent.threadID}} 
              class="reply-btn shrink-0 rounded-full p-1 mx-2 shadow-lg bg-blue-300 hover:bg-blue-400 active:shadow-none">
              <span class="pointer-events-none">
                <img src="/images/reply_FILL0_wght400_GRAD0_opsz48.svg"
                class="rounded-full w-3 md:w-5 pointer-events-none" alt="Reply">
              </span>
            </button>
            <p class="hidden md:flex">Reply</p>
          </div>

          <div class="flex">
            <button id="reply-btn" type="button" data-postid={{mainPostContent.threadID}}
              class="quote-btn pointer-events-none shrink-0 rounded-full p-1 mx-2 shadow-lg bg-gray-300 hover:bg-blue-400 active:shadow-none">
              <span class="pointer-events-none">
                <img src="/images/format_quote_FILL0_wght400_GRAD0_opsz48.svg" class="rounded-full w-3 md:w-5"
                  alt="Quote">
              </span>
            </button>
            <p class="hidden md:flex">Quote</p>
          </div>
        </div>     
      </div>

      {{#each posts}}  
      <div id="postReply" class="my-3 border-b-2 pb-2 border-blue-200">
        <div class="flex items-center">
          <span class="shrink-0"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" 
            class="rounded-full w-8 md:w10" alt="Avatar">
          </span>

          <div class="flex justify-between items-center w-full">
            <div class="px-2 text-xs md:text-base">
              <p><span class="text-blue-600 font-medium">{{user.username}}</span></p>
              <p>on <span class="font-semibold">{{../format_date date_created}}</span></p>
            </div>

            {{#compare user.id ../currentUserID}}
            <div>
              <button id="post" type="button" data-postid={{id}}
                class="del-btn flex align-middle px-2 bg-black text-blue-300 uppercase rounded shadow-md hover:bg-blue-300 hover:text-slate-900 hover:shadow-lg active:outline-none active:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
                <span class="text-xs font-semibold pointer-events-none">Del</span>
              </button>
            </div>
            {{/compare}}
          </div>
        </div>

        <div id="postContent" data-postid={{id}}>
          <div class="mt-2 md:mt-4 break-words overflow-hidden">
            <p class="content" class="content">
              <span class="text-sm md:text-base">{{content}}</span>
              
              {{#compare user.id ../currentUserID}}
              <div class="flex">
                <p class="edit-post w-full text-right text-xs font-semibold mr-2 cursor-pointer text-slate-400 hover:text-slate-700 active:text-slate-400 duration-150 ease-in-out">
                <span class="pointer-events-none">edit</span></p>
              </div>
              {{/compare}}
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
