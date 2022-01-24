import * as React from 'react';

export default function Login() {
  async function doLogin() {
    const user = 'laite';
    const password = 'laite';

    const data = new URLSearchParams();
    data.append('user', user);
    data.append('password', password);

    const response = await fetch(
      '/api/login',
      {
        method: 'POST',
        body: data,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      },
    );

    if (response.ok) {
      window.location.replace('/');
    }
  }

  return (
    <div>
      <button type="button" onClick={doLogin}>Login</button>
    </div>
  );
}
