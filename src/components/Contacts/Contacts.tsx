import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectContacts, selectContactsLoaded } from '../../store/contacts/contactSelector';
import { selectUserContactId } from '../../store/user/userSelectors';
import { Contact } from '../../types/contactTypes';
import Link from '../Common/Link';
import ContactListRow from './ContactListRow';
import ContactRowFilter from './ContactRowFilter';

type SortableField = 'workplace' | 'jobTitle';
type SortOption = 'default' | 'workplace' | 'jobTitle';
function makeSearchableStringFromContact(contact: Contact) {
  const {
    firstName, lastName, id, workplace, description, jobTitle,
  } = contact;
  return Object.values({
    firstName, lastName, id, workplace, description, jobTitle,
  }).filter((x) => x).join('').toLowerCase();
}

function sortBy(field: SortableField) {
  return function doSort(a: Contact, b: Contact) {
    /* We sort empty values to the bottom */
    if (!a[field] || !b[field]) {
      return a[field] ? -1 : 1;
    }

    /* If the field value is equal, we sort the rows by the lastName */
    return (a[field] === b[field])
      ? (a.lastName || '').localeCompare(b.lastName || '')
      : a[field].localeCompare(b[field]);
  };
}

function sortContacts(contacts: Contact[], sort: SortOption) {
  switch (sort) {
    case 'workplace':
    case 'jobTitle':
      return contacts.slice().sort(sortBy(sort));
    case 'default':
    default:
      return contacts;
  }
}

export default function Contacts() {
  const selfContactId = useSelector(selectUserContactId);
  const contacts = useSelector(selectContacts);
  const loaded = useSelector(selectContactsLoaded);

  const [filter, setFilter] = React.useState('');
  const [sort, setSort] = React.useState<SortOption>('default');

  const filteredContacts = filter
    ? contacts.filter((contact) => {
      const searchString = makeSearchableStringFromContact(contact);
      return searchString.indexOf(filter.toLowerCase()) !== -1;
    })
    : contacts;

  const sortedContacts = sort === 'default'
    ? filteredContacts
    : sortContacts(filteredContacts, sort);

  return (
    <div>
      <div className="flex justify-between">
        <h2 className="text-xl">Contacts</h2>
        <Link className="text-blue-600 mr-3 whitespace-nowrap" to="/contacts/new">
          + Add new contact
        </Link>
      </div>
      <ContactRowFilter value={filter} setValue={setFilter} />
      <div className="grid grid-cols-3 font-bold border-b">
        <button className="font-bold text-left" type="button" onClick={() => setSort('default')}>
          Name
        </button>
        <button className="font-bold text-left" type="button" onClick={() => setSort('jobTitle')}>
          Job Title
        </button>
        <button className="font-bold text-left" type="button" onClick={() => setSort('workplace')}>
          Workplace
        </button>
      </div>
      {loaded
        ? sortedContacts.map((contact) => (
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
