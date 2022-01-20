import * as React from 'react';

export default function Login() {
  async function doLogin() {
    const user = 'user';
    const password = '9039f27e-e80c-4861-acf2-3d4c8793a07e';

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
