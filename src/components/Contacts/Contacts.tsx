import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from '../Common/Link';

export default function Contacts() {
  // const dispatch = useDispatch();
  // const contacts = useSelector();
  // const loaded = useSelector();

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl">Contacts</h2>
        <Link className="text-blue-600 mr-3 whitespace-nowrap" to="/contacts/new">
          + Add new contact
        </Link>
      </div>
      {/* {loaded
        ? contacts.map((contact) => <span>{contact.name}</span>)
        : <span>Loading</span>} */}
    </div>
  );
}
