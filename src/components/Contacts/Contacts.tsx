import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectContacts, selectContactsLoaded } from '../../store/contacts/contactSelector';
import { selectUserContactId } from '../../store/user/userSelectors';
import { Contact } from '../../types/contactTypes';
import Link from '../Common/Link';
import ContactListRow from './ContactListRow';
import ContactRowFilter from './ContactRowFilter';

function makeSearchableStringFromContact(contact: Contact) {
  const {
    firstName, lastName, id, workplace, description, jobTitle,
  } = contact;
  return Object.values({
    firstName, lastName, id, workplace, description, jobTitle,
  }).filter((x) => x).join('').toLowerCase();
}

export default function Contacts() {
  const selfContactId = useSelector(selectUserContactId);
  const contacts = useSelector(selectContacts);
  const loaded = useSelector(selectContactsLoaded);

  const [filter, setFilter] = React.useState('');

  const filteredContacts = filter
    ? contacts.filter((contact) => {
      const searchString = makeSearchableStringFromContact(contact);
      return searchString.indexOf(filter.toLowerCase()) !== -1;
    })
    : contacts;

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl">Contacts</h2>
        <Link className="text-blue-600 mr-3 whitespace-nowrap" to="/contacts/new">
          + Add new contact
        </Link>
      </div>
      <ContactRowFilter value={filter} setValue={setFilter} />
      {loaded
        ? filteredContacts.map((contact) => (
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
