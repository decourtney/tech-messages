// Method for inserting Create Form
const insertNewThreadForm = (event) => {
  const rightPanel = document.querySelector('#right-panel-details');
  const threadFormHTML = `
  <div class="flex w-full">
    <div id="post-box" class="pb-4 mb-2 w-full border-b-2 border-blue-300">
      <div class="flex w-full justify-end mb-2">
        <p 
        class="close-form flex items-center justify-center mr-2 pb-1 border border-transparent rounded-full h-4 w-4 text-slate-400 hover:border-slate-500 hover:text-slate-900 active:text-slate-400 active:border-transparent cursor-pointer duration-150 ease-in-out">
        <span class="pointer-events-none">x</span></p>
      </div>
      <div>
        <input id="thread-title" name="title"
        class="appearance-none flex w-full text-sm md:text-base bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 md:px-4 mb-3 leading-none focus:outline-none focus:bg-white focus:border-gray-500"
        type="text" placeholder="Title">
      </div>
      <div class="w-full">
        <textarea id="thread-content" name="content"
        class="appearance-none flex w-full text-sm md:text-base bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 md:px-4 mb-3 leading-none focus:outline-none focus:bg-white focus:border-gray-500"
        rows="10" placeholder="Content"></textarea>
      </div>
      <div class="flex justify-start">
        <button id="thread-btn" type="button"
        class="btn flex align-middle px-2 bg-black text-blue-400 uppercase rounded shadow-md hover:bg-blue-300 hover:text-slate-900 hover:shadow-lg active:outline-none active:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
        <span class="text-xs font-semibold pointer-events-none">Create It</span></button>
      </div>
    </div>
  </div>`;

  // Insert html and add listeners
  rightPanel.innerHTML = threadFormHTML;
  const threadTitle = document.querySelector('#post-box #thread-title');
  const threadContent = document.querySelector('#post-box #thread-content');
  const threadBtn = document.querySelector('#post-box #thread-btn');

  threadBtn.addEventListener('click', (event) => {
    handleNewThread(threadTitle.value.trim(), threadContent.value.trim());
  });
};

// Calls api with thread content
const handleNewThread = async (title, content) => {
  try {
    const response = await fetch('/api/users/create-thread', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
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

// Method to handle search form
// Under Construction
const handleSearchForm = (event) => {
  event.preventDefault();
  const searchTerm = document.querySelector('#searchbar').value.trim();
  event.target.reset();

  // if (searchTerm === '')
  //   return;

  // let allLeftPanelEls = document.querySelectorAll('#left-panel #post-cards p, #left-panel #post-cards h2');
  // const allRightPanelEls = document.querySelectorAll('#right-panel p, #right-panel span, #right-panel h2');

  // highlightSearchResults(allLeftPanelEls, searchTerm);

  // if (allRightPanelEls.length > 0)
  //   highlightSearchResults(allRightPanelEls, searchTerm);

};

const highlightSearchResults = (elArr, searchTerm) => {
  elArr.forEach(element => {
    let text = element.textContent 

    let re = new RegExp(searchTerm);

    let newText = '';
    if(text.match(re)){
      console.log('Initial text ' + text + element)
      newText = text.replace(re, `<mark>${searchTerm}</mark>`);
      element.innerHTML = newText;

      setTimeout(() =>{
        element.innerHTML = text
      },3000);
    }
  });
}

const getAllChildTextContent = (el) => {
  if (el.children.length === 0) return [el];

  let allTextContent = [];
  let allChildElements = [];

  for (let i = 0; i < el.children.length; i++) {
    if (el.children[i].textContent)
      allTextContent.push(el.children[i].textContent);

    let children = getAllChildTextContent(el.children[i]);
    if (children) allChildElements.push(...children);
  }
  allChildElements.push(el);

  return allTextContent;
}


document
  .querySelector('#create-thread')
  .addEventListener('click', insertNewThreadForm);

document
  .querySelector('#search')
  .addEventListener('submit', handleSearchForm)
