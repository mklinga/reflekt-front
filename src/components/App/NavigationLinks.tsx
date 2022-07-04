import * as React from 'react';
import { Location, useLocation } from 'react-router';
import Link from '../Common/Link';

function getLinkClassNames(location: Location, linkTo: string) {
  const isActive = location.pathname.startsWith(linkTo);
  const color = isActive ? 'text-black' : 'text-blue-600';

  return `${color} mr-3`;
}

export default function NavigationLinks() {
  const location = useLocation();

  return (
    <div>
      <Link className={getLinkClassNames(location, '/journal')} to="/journal">Journals</Link>
      <Link className={getLinkClassNames(location, '/contacts')} to="/contacts">Contacts</Link>
    </div>
  );
}
