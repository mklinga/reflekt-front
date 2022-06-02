import * as React from 'react';
import TextInput from '../Common/TextInput';

async function doLogin(user: string, password: string): Promise<boolean> {
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

  if (response.status === 200) {
    window.location.replace('/');
    return true;
  }

  return false;
}

function onChangeHandler(setterFn: React.Dispatch<React.SetStateAction<string>>) {
  return (e: React.ChangeEvent<HTMLInputElement>) => setterFn(e.target.value);
}

function onKeyPressHandler(loginHandler: () => Promise<void>) {
  return function handler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      loginHandler();
    }
  };
}

export default function Login() {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(false);

  async function loginHandler() {
    setError(false);
    const loginOk = await doLogin(name, password);
    setError(!loginOk);
  }

  return (
    <div className="flex flex-col mt-40 mx-auto text-center">
      <h1>History awaits, just give the word...</h1>
      <div>
        <TextInput autoFocus className="m-2 p-3" placeholder="Username" onChange={onChangeHandler(setName)} />
        <TextInput
          className="m-2 p-3"
          placeholder="Password"
          onChange={onChangeHandler(setPassword)}
          onKeyPress={onKeyPressHandler(loginHandler)}
        />
      </div>
      <button type="button" onClick={loginHandler}>Login</button>
      {error ? <span className="text-red-600">Beep. Boop.</span> : null}
    </div>
  );
}
