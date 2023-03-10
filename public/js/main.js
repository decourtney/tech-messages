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
};

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


