const signupFormHandler = async (event) =>
{
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const f_name = document.querySelector('#fname').value.trim();
  const l_name = document.querySelector('#lname').value.trim();
  const password1 = document.querySelector('#password1').value.trim();
  const password2 = document.querySelector('#password2').value.trim();

  const form = document.querySelector('#register-form').reset();

  let password = '';
  if (password1 === password2)
  {
    password = password1
  } else
  {
    document.querySelector('#register-form #error-msg').innerHTML = `<span class="animate-pulse font-bold text-red-500 drop-shadow-md">Passwords Didn't Match</span>`;

    setTimeout(() => {
      document.querySelector('#register-form #error-msg').innerHTML = `<span>!!--No Recovery Method--!!</span>`;
    }, 5000);
    return;
  }

  if (username && email && f_name && l_name && password)
  {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, f_name, l_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok)
    {
      document.location.replace('/profile');
    } else
    {
      const errRes = await response.json();
      const errMsg = errRes.message || 'Oops! Something went wrong.'
      const errDiv = document.querySelector('#register-form #err-msg').innerHTML = `<span class="visible font-semibold text-red-500 drop-shadow-md">${ errMsg }</span>`

      setTimeout(() =>
      {
        document.querySelector('#register-form #err-msg').innerHTML = `<span class="invisible font-semibold text-red-500 drop-shadow-md">Error Message</span>`;
      }, 4000);
    }
  }
};

document
  .querySelector('#register-form #btn')
  .addEventListener('click', signupFormHandler);