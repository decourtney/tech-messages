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
      .then((data) => {updatePostContent(data)})

  }
}

const updatePostContent = (data) =>
{
  console.log(data)
  // Getting all data. Now need to cycle through the right panel and update
}

const handleSectionIndicator = (event) =>
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
  .forEach(item => item.addEventListener('click', handleSectionIndicator))

