import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../../services/contact';
import { selectContactEntries, selectContactEntriesLoaded } from '../../store/contacts/contactSelector';
import { setContactEntries, setContactEntriesLoaded } from '../../store/contacts/contactSlice';
import { selectUserContactId } from '../../store/user/userSelectors';
import Link from '../Common/Link';
import ContactListRow from './ContactListRow';

export default function Contacts() {
  const dispatch = useDispatch();
  const selfContactId = useSelector(selectUserContactId);
  const contacts = useSelector(selectContactEntries);
  const loaded = useSelector(selectContactEntriesLoaded);

  React.useEffect(() => {
    if (loaded) {
      return;
    }

    fetchContacts().then((receivedContacts) => {
      dispatch(setContactEntries(receivedContacts));
      dispatch(setContactEntriesLoaded(true));
    });
  }, []);

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
        : <span>Loading</span>}
    </div>
  );
}
