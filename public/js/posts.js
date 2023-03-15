const handleDeletePost = async (event) => {
  const btn = event.target;
  const postid = btn.dataset.postid;
  let apiPath = '';

  // Determine if the post to delete is the main threads post or one of the reply posts
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

// Method to insert the text area for writing a reply post
const insertReplyArea = async (event) => {
  if (document.querySelector('#post-box')) return;
  const btn = event.target;
  const postID = btn.dataset.postid;
  const mainPost = btn.closest('#mainPost');

  const textArea = `
  <div id="post-box" class="pb-4 mb-2 border-b-2 border-blue-300">
    <div class="flex w-full justify-end pt-2">
      <p 
      class="close-form flex items-center justify-center mr-2 pb-1 border border-transparent rounded-full h-4 w-4 text-slate-400 hover:border-slate-500 hover:text-slate-900 active:text-slate-400 active:border-transparent cursor-pointer duration-150 ease-in-out">
      <span class="pointer-events-none">x</span></p>
    </div>

    <div class="w-full">
      <label class="block uppercase text-gray-700 text-xs font-bold mb-2" for="textarea">
        Enter your reply:
      </label>
      <textarea id="reply-textarea" name="textarea"
        class="appearance-none flex w-full text-sm md:text-base bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 md:py-3 px-2 md:px-4 mb-3 leading-none md:leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        rows="5"></textarea>
    </div>

    <div class="flex justify-start">
      <button id="reply-btn" type="button"
        class="btn flex align-middle px-2 bg-black text-blue-400 uppercase rounded shadow-md hover:bg-blue-300 hover:text-slate-900 hover:shadow-lg active:outline-none active:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
        <span class="text-xs font-semibold pointer-events-none">Send It</span></button>
    </div>
  </div>`;

  mainPost.insertAdjacentHTML('afterend', textArea);

  const replyTextarea = document.querySelector('#post-box #reply-textarea');
  const replyBtn = document.querySelector('#post-box #reply-btn');

  // Add listener to newly inserted button
  replyBtn.addEventListener('click', (event) => {
    handleNewPost(postID, replyTextarea.value.trim());
  });
};

// This method takes the new content and mainpost id for association
const handleNewPost = async (mainpost_id, content) => {
  try {
    const response = await fetch('/api/users/create-post', {
      method: 'POST',
      body: JSON.stringify({ mainpost_id, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload('/myposts');
    }
  } catch (err) {
    console.log('An error occured while creating the post');
    console.log(err);
  }
};

// Method for inserting the edit-post text area
const insertModifyArea = (event) => {
  const contentEl = event.target.closest('#postContent');
  const postId = contentEl.dataset.postid
  const content = contentEl.querySelector('.content').textContent.trim();
  const textArea = `
    <div id="post-box" class="">
      <div class="flex w-full justify-end mb-2">
        <p class="close-edit flex items-center justify-center mr-2 pb-1 border border-transparent rounded-full h-4 w-4 text-slate-600 hover:border-slate-500 hover:text-slate-900 active:text-slate-400 active:border-transparent cursor-pointer duration-150 ease-in-out"><span class="pointer-events-none">x</span></p>
      </div>
      <div class="w-full">
        <textarea id="edit-textarea" name="textarea"
          class="appearance-none block w-full text-sm md:text-base bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 md:px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          rows="5">${content}</textarea>
      </div>
      <div class="flex justify-start">
        <button id="edit-btn" type="button"
          class="btn inline-block px-3 pb-1 bg-black text-blue-400 leading-tight uppercase rounded shadow-md hover:bg-blue-300 hover:text-slate-900 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
          <span class="text-xs font-semibold pointer-events-none">Send It</span></button>
      </div>
    </div>`

    contentEl.innerHTML = textArea;
    const newContent = contentEl.querySelector('#edit-textarea');
    const editBtn = contentEl.querySelector('#edit-btn');

    // Add listener to newly inserted button
    editBtn.addEventListener('click', (event) => {
      handleModifyPost(postId, newContent.value.trim());
    });
};

// Method responsible for making update api call to update posts
const handleModifyPost = async (id, content) => {
  try {
    const response = await fetch('/api/users/modify-post', {
      method: 'POST',
      body: JSON.stringify({ id, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.reload('/myposts');
    }
  } catch (err) {
    console.log('An error occured while creating the thread');
    console.log(err);
  }
};

// If the user clicks the x on any window insert the default right panel
const closeModifyArea = (event) => {
  console.log(event)
  const contentEl = event.target.closest('#postContent');
  const content = contentEl.querySelector('#edit-textarea').textContent.trim();
  const postContentHTML = `
    <div class="mt-2 md:mt-4 break-words overflow-hidden">
      <p id="mainContent" class="content">
        <span class="text-sm md:text-base">${content}</span>

        <div class="flex">
          <p class="edit-post w-full text-right text-xs font-semibold mr-2 cursor-pointer text-slate-400 hover:text-slate-700 active:text-slate-400 duration-150 ease-in-out">
            <span class="pointer-events-none">edit</span></p>
        </div>
      </p>
    </div>`

  contentEl.querySelector('#post-box').remove();
  contentEl.innerHTML = postContentHTML;
};

// Listeners for dynamic content
document.querySelector('#right-panel')
  .addEventListener('click', (event) => {
    if (event.target.classList.contains('del-btn')) {
      handleDeletePost(event);
    } else if (event.target.classList.contains('reply-btn')) {
      insertReplyArea(event);
    } else if (event.target.classList.contains('close-form')) {
      event.target.closest('#post-box').remove();
    } else if (event.target.classList.contains('edit-post')) {
      insertModifyArea(event);
    } else if (event.target.classList.contains('close-edit')){
      closeModifyArea(event);
    }
  });
