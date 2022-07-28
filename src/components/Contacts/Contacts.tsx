import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectContacts, selectContactsLoaded } from '../../store/contacts/contactSelector';
import { selectUserContactId } from '../../store/user/userSelectors';
import Link from '../Common/Link';
import ContactListRow from './ContactListRow';

export default function Contacts() {
  const selfContactId = useSelector(selectUserContactId);
  const contacts = useSelector(selectContacts);
  const loaded = useSelector(selectContactsLoaded);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl">Contacts</h2>
        <Link className="text-blue-600 mr-3 whitespace-nowrap" to="/contacts/new">
          + Add new contact
        </Link>
      </div>
      {loaded
        ? contacts.map((contact) => (
          <ContactListRow
            key={contact.id}
            contact={contact}
            isUser={contact.id === selfContactId}
          />
        ))
        : <span>If you can see this, loading the contact data has probably failed... 🤔</span>}
    </div>
  );
}
