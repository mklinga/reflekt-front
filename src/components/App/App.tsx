import * as React from 'react';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import Link from '../Common/Link';
import NavigationLinks from './NavigationLinks';
import { selectUsername } from '../../store/user/userSelectors';
import classes from '../../utils/classes';

function isLocalHost() {
  return window.location.hostname.match(/localhost/);
}

export default function App() {
  const username = useSelector(selectUsername);
  const headerText = `Reflekt${isLocalHost() ? ' - DEVELOPMENT' : ''}`;
  const headerClass = classes([
    'text-xl font-medium border-b border-black',
    isLocalHost() ? 'text-white bg-cyan-600 p-3' : 'text-black py-3',
  ]);

  return (
    <>
      <div className="grow">
        <header className="mb-3">
          <Link to="/">
            <h1 className={headerClass}>{headerText}</h1>
          </Link>
          <NavigationLinks />
        </header>
        <Outlet />
      </div>
      <footer className="text-sm py-6">
        <hr />
        {`Logged in as ${username}`}
      </footer>
    </>
  );
}
