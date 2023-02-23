const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  const form = document.querySelector('#login-form').reset();

  console.log(email, password)
  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/myposts');
    } else {
      const errRes = await response.json();
      const errMsg = errRes.message || 'Oops! Something went wrong.'
      const errDiv = document.querySelector('#login-form #err-msg').innerHTML = `<span class="visible font-semibold text-red-500 drop-shadow-md">${errMsg}</span>`

      setTimeout(() =>
      {
        document.querySelector('#login-form #err-msg').innerHTML = `<span class="invisible font-semibold text-red-500 drop-shadow-md">Error Message</span>`;
      }, 4000);
    }
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);