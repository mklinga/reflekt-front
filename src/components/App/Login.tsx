import * as React from 'react';
import TextInput from '../Common/TextInput';
import login from '../../services/login';

function onChangeHandler(setterFn: React.Dispatch<React.SetStateAction<string>>) {
  return (e: React.ChangeEvent<HTMLInputElement>) => setterFn(e.target.value);
}

function onEnterPress(loginHandler: () => Promise<void>) {
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
    if (await login(name, password)) {
      window.location.replace('/');
    } else {
      setError(true);
    }
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
          onKeyPress={onEnterPress(loginHandler)}
        />
      </div>
      <button type="button" onClick={loginHandler}>Login</button>
      {error ? <span className="text-red-600">Beep. Boop.</span> : null}
    </div>
  );
}
