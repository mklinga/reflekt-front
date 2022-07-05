import * as React from 'react';
import { Location, useLocation } from 'react-router';
import Link from '../Common/Link';

function getLinkClassNames(location: Location, linkTo: string) {
  const isActive = location.pathname === linkTo;
  return isActive ? 'text-black font-bold' : 'text-blue-600';
}

export default function NavigationLinks() {
  const location = useLocation();

  return (
    <div className="my-3">
      <Link className={`mr-3 ${getLinkClassNames(location, '/journal')}`} to="/journal">Journals</Link>
      <Link className={getLinkClassNames(location, '/contacts')} to="/contacts">Contacts</Link>
    </div>
  );
}
