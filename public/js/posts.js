const handleDeletePost = async (event) => {
  const btn = event.target;
  const postid = btn.dataset.postid;
  let apiPath = '';

  if (btn.id === "main-post") {
    apiPath = `/api/users/main-post/${postid}`
  } else {
    apiPath = `/api/users/post/${postid}`
  }

  try {
    const response = await fetch(apiPath, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload('/myposts');
    }

  } catch (err) {
    console.log('An error occured while deleting the post');
    console.log(err);
  }
};

const insertTextArea = async (event) => {
  const btn = event.target;
  const postID = btn.dataset.postid;
  const mainPost = btn.closest('#mainPost');
  console.log(mainPost)

  const textArea = `
  <div id="reply-box" class="border-b-2 border-blue-200 my-5 pb-5">
    <div class="w-full">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="textarea">
        Enter your reply:
      </label>
      <textarea id="reply-textarea" name="textarea"
        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        rows="5"></textarea>
    </div>
    <div class="flex justify-start">
      <button id="reply-btn" type="button"
        class="btn inline-block px-3 pb-1 bg-black text-blue-300 leading-tight uppercase rounded shadow-md hover:bg-blue-300 hover:text-slate-900 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
        <span class="text-xs font-semibold pointer-events-none">Send It</span></button>
    </div>
  </div>`

  mainPost.insertAdjacentHTML('afterend', textArea); // Need to figure out how to remove the box, refresh might work but feels dirty??

  const replyTextarea = document.querySelector('#reply-box #reply-textarea');
  const replyBtn = document.querySelector('#reply-box #reply-btn');

  replyTextarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleNewPost(postID, replyTextarea.value.trim());
    }
  });

  // console.log(replyTextarea.value.trim())
  replyBtn.addEventListener('click', (event) => {
    handleNewPost(postID, replyTextarea.value.trim());
  });
};

const handleNewPost = async (postID, replyText) => {
  try {
    const response = await fetch('/api/users/create-post', {
      method: 'POST',
      body: JSON.stringify({postID, replyText}),
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.log('An error occured while creating the post');
    console.log(err);
  }
}

document.querySelector('#right-panel-details')
  .addEventListener('click', (event) => {
    if (event.target.classList.contains('del-btn')) {
      handleDeletePost(event);
    } else if (event.target.classList.contains('reply-btn')) {
      insertTextArea(event);
    }
  });
