const getPostContent = async (event) =>
{
  const indicator = event.target.closest('#post-cards').querySelector('#indicator');

  document.querySelectorAll('#post-cards #indicator').forEach(i => i.style.visibility = 'hidden');
  indicator.style.visibility = 'visible';

  const name = event.target.querySelector('#name').textContent;
  const title = event.target.querySelector('#title').textContent;
  console.log(title, name);

  if (title && name)
  {
    const response = await fetch('/api/forum', {
      method: 'POST',
      body: JSON.stringify({ name, title }),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json())
      .then((data) => { updatePostContent(data) })
  }
}

const updatePostContent = (data) =>
{
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const posts = []
  function post(title, creator, poster, date, isMain, content)
  {
    this.title = title,
      this.creator = creator
    this.poster = poster,
      this.date = date,
      this.isMain = isMain,
      this.content = content
  }

  data.posts.forEach((element, index) =>
  {
    posts.push(new post(data.title, data.user.name, element.user.name, new Date(element.date_created).toLocaleDateString('en-us', options), element.is_mainpost, element.content))
  });

  console.log(posts)

  let postContent = ''
  posts.forEach(element =>
  {
    if (element.isMain)
    {
      postContent = `
      <section id="mainPost" class="border-b-2 border-blue-200">
      <div id = "postContentHeader">
      <h2 id="title" class="font-semibold text-3xl mb-5">${ element.title }</h2>
      <div class="flex items-center">
        <span class="shrink-0"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10"
            alt="Avatar">
        </span>
        <div class="px-2">
          <p>Started by <span id="createdbyName" class="text-blue-600 font-medium">${ element.creator }</span></p>
          <p>on <span id="createdbyDate" class="font-semibold">${ (element.date) }</span></p>
        </div>
      </div>
    </div >

    <div id="postContent">
      <div class="mt-4">
        <p id="mainContent">
          ${ element.content }
        </p>
      </div>
    </div>

    <div class="flex" id="postContentFooter">
      <div class="flex pt-5 pb-10 mr-5">
        <span class="shrink-0 rounded-full p-1 mx-2 bg-emerald-400"><img
            src="./images/reply_FILL0_wght400_GRAD0_opsz48.svg" class="rounded-full w-5" alt="Reply">
        </span>
        <p>Reply</p>
      </div>

      <div class="flex pt-5 pb-10 mr-5">
        <span class="shrink-0 rounded-full p-1 mx-2 bg-emerald-400"><img
            src="./images/format_quote_FILL0_wght400_GRAD0_opsz48.svg" class="rounded-full w-5" alt="Quote">
        </span>
        <p>Quote</p>
      </div>
    </div>
    </section>`
    } else
    {
      postContent += `<section id="postReply" class="my-5 border-b-2 border-blue-200">
        <div class="flex items-center">
          <span class="shrink-0"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10"
            alt="Avatar">
          </span>
          <div class="px-2">
            <p><span class="text-blue-600 font-medium">${ element.poster }</span></p>
            <p>on <span class="font-semibold">${ element.date }</span></p>
          </div>
        </div>

        <div id="postContent">
          <div class="mt-4">
            <p>
            ${ element.content }
            </p>
          </div>
        </div>

        <div class="flex" id="postContentFooter">
          <div class="flex pt-5 pb-10 mr-5">
            <span class="shrink-0 rounded-full p-1 mx-2 bg-emerald-400"><img
              src="./images/reply_FILL0_wght400_GRAD0_opsz48.svg" class="rounded-full w-5" alt="Reply">
            </span>
            <p>Reply</p>
          </div>

          <div class="flex pt-5 pb-10 mr-5">
            <span class="shrink-0 rounded-full p-1 mx-2 bg-emerald-400"><img
              src="./images/format_quote_FILL0_wght400_GRAD0_opsz48.svg" class="rounded-full w-5" alt="Quote">
            </span>
            <p>Quote</p>
          </div>
        </div>
      </section>`
    }
  });

  document.getElementById('right-panel-details').innerHTML = postContent;
}

const handleNewPost = (event) =>
{
  console.log('new post button hit')
}

const handleMenuIndicator = (event) =>
{
  const indicator = event.target.closest('#menu-item').querySelector('#indicator');
  document.querySelectorAll('#menu-item #indicator').forEach(i => i.style.visibility = 'hidden')

  indicator.style.visibility = 'visible';
}

document
  .querySelectorAll('#post-cards #card')
  .forEach(card => card.addEventListener('click', getPostContent))

document
  .querySelectorAll('#menu-item a')
  .forEach(item => item.addEventListener('click', handleMenuIndicator))

document
  .querySelector('#newpost-btn button')
  .addEventListener('click', handleNewPost)

