import * as React from 'react';
import { Outlet } from 'react-router';
import NavigationLinks from './NavigationLinks';

function isLocalHost() {
  return window.location.hostname.match(/localhost/);
}

export default function App() {
  const header = isLocalHost()
    ? <h1 className="text-xl font-medium text-white bg-cyan-600 border-b border-black p-3">Reflekt - DEVELOPMENT</h1>
    : <h1 className="text-xl font-medium text-black border-b border-black py-3">Reflekt</h1>;
  return (
    <div>
      <header className="mb-3">
        {header}
        <NavigationLinks />
      </header>
      <Outlet />
    </div>
  );
}
