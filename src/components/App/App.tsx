import * as React from 'react';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import Link from '../Common/Link';
import NavigationLinks from './NavigationLinks';
import { selectUsername } from '../../store/user/userSelectors';

function isLocalHost() {
  return window.location.hostname.match(/localhost/);
}

export default function App() {
  const header = isLocalHost()
    ? <h1 className="text-xl font-medium text-white bg-cyan-600 border-b border-black p-3">Reflekt - DEVELOPMENT</h1>
    : <h1 className="text-xl font-medium text-black border-b border-black py-3">Reflekt</h1>;

  const username = useSelector(selectUsername);

  return (
    <>
      <div className="grow">
        <header className="mb-3">
          <Link to="/">{header}</Link>
          <NavigationLinks />
        </header>
        <Outlet />
      </div>
      <footer className="text-sm py-6">
        <hr />
        Logged in as
        {' '}
        {username}
      </footer>
    </>
  );
}
