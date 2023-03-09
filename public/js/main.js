const getPostContent = async (event) => {
  const indicator = event.target.closest('#post-cards').querySelector('#indicator');

  document.querySelectorAll('#post-cards #indicator').forEach(i => i.style.visibility = 'hidden');
  indicator.style.visibility = 'visible';

  const username = event.target.querySelector('#username').textContent.trim();
  const title = event.target.querySelector('#title').textContent.trim();

  if (title && username) {
    try {
      const response = await fetch('/api/forum', {
        method: 'POST',
        body: JSON.stringify({ username, title }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const postContentHTML = await response.text();
        document.getElementById('right-panel-details').innerHTML = postContentHTML;
      }
    } catch (err) {
      console.log('Error occured retrieving data');
    }
  }
}

// const updatePostContent = (data) => {
//   const options = { year: 'numeric', month: 'short', day: 'numeric' };
//   const posts = []
//   function post(title, creator, poster, date, isMain, content) {
//     this.title = title,
//       this.creator = creator,
//       this.poster = poster,
//       this.date = date,
//       this.isMain = isMain,
//       this.content = content
//   }

//   data.posts.forEach((element, index) => {
//     posts.push(new post(data.title, data.user.username, element.user.username, new Date(element.date_created).toLocaleDateString('en-us', options), element.is_mainpost, element.content))
//   });

//   // console.log(posts)

//   let postContent = ''
//   posts.forEach(element => {
//     if (element.isMain) {
//       postContent = `
//       <section id="mainPost" class="border-b-2 border-blue-200">
//         <div id = "postContentHeader">
//           <div class="flex justify-between items-center">
//             <h2 class="font-semibold text-3xl py-5">${element.title}</h2>
//             <div>
//               <button type="button"
//                 class="inline-block px-3 pb-1 bg-black text-blue-300 leading-tight uppercase rounded shadow-md hover:bg-blue-300 hover:text-slate-900 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-slate-800 active:shadow-lg transition duration-150 ease-in-out">
//                 <a href="">
//                   <span class="text-xs font-semibold">Delete</span></a></button>           
//             </div>
//           </div>
//           <div class="flex items-center">
//             <span class="shrink-0"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10"
//                 alt="Avatar">
//             </span>
//             <div class="px-2">
//               <p>Started by <span id="createdbyName" class="text-blue-600 font-medium">${element.creator}</span></p>
//               <p>on <span id="createdbyDate" class="font-semibold">${(element.date)}</span></p>
//         </div>
//       </div>
//     </div >

//     <div id="postContent">
//       <div class="mt-4">
//         <p id="mainContent">
//           ${element.content}
//         </p>
//       </div>
//     </div>

//     <div class="flex" id="postContentFooter">
//       <div class="flex pt-5 pb-10 mr-5">
//       <button class="shrink-0 rounded-full p-1 mx-2 shadow-lg bg-blue-300 hover:bg-blue-400 active:shadow-none">
//         <span><img src="/images/reply_FILL0_wght400_GRAD0_opsz48.svg"
//             class="rounded-full w-5" alt="Reply">
//         </span>
//       </button>
//       <p>Reply</p>
//       </div>

//       <div class="flex pt-5 pb-10 mr-5">
//         <span class="shrink-0 rounded-full p-1 mx-2 bg-gray-300"><img
//             src="/images/format_quote_FILL0_wght400_GRAD0_opsz48.svg" class="rounded-full w-5" alt="Quote">
//         </span>
//         <p>Quote</p>
//       </div>
//     </div>
//     </section>`
//     } else {
//       postContent += `<section id="postReply" class="my-5 border-b-2 border-blue-200">
//         <div class="flex items-center">
//           <span class="shrink-0"><img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" class="rounded-full w-10"
//             alt="Avatar">
//           </span>
//           <div class="px-2">
//             <p><span class="text-blue-600 font-medium">${element.poster}</span></p>
//             <p>on <span class="font-semibold">${element.date}</span></p>
//           </div>
//         </div>

//         <div id="postContent">
//           <div class="my-4">
//             <p>
//             ${element.content}
//             </p>
//           </div>
//         </div>
//       </section>`
//     }
//   });

//   document.getElementById('right-panel-details').innerHTML = postContent;
// }

// const handleNewPost = (event) => {
//   console.log('new post button hit')
// }

const handleMenuIndicator = (event) => {
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

// document
//   .querySelector('#newpost-btn #btn')
//   .addEventListener('click', handleNewPost)
