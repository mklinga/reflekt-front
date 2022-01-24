import * as React from 'react';
import { Outlet } from 'react-router';
import NavigationLinks from './NavigationLinks';

export default function App() {
  return (
    <div>
      <header className="mb-3">
        <h1 className="text-xl font-medium text-black border-b border-black py-3">Reflekt</h1>
        <NavigationLinks />
      </header>
      <Outlet />
    </div>
  );
}
