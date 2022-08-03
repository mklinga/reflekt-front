import * as React from 'react';
import { useSelector } from 'react-redux';
import { addNewContact } from '../../services/contact';
import { selectContacts } from '../../store/contacts/contactSelector';
import { Contact, ContactRelation } from '../../types/contactTypes';
import ActionButton from '../Common/ActionButton';
import TextInput from '../Common/TextInput';
import RelationBuilder from './RelationBuilder';

export default function ContactCreator() {
  const oldContacts = useSelector(selectContacts);

  const [data, setData] = React.useState<Contact>({
    id: '00000000-0000-0000-0000-000000000000',
    firstName: '',
    lastName: '',
    jobTitle: '',
    workplace: '',
    description: '',
    relations: [],
  });

  const createContact = () => {
    addNewContact(data);
  };

  const updateRelations = (relations: ContactRelation[]) => {
    setData((oldData) => ({ ...oldData, relations }));
  };

  const changeText = ((field: keyof Contact) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((oldData) => ({ ...oldData, [field]: e.target.value }));
  });

  return (
    <div className="w-9/12 text-center mx-auto">
      <h2 className="text-xl mb-3">Add new Contact</h2>
      <div className="my-3">
        <label className="flex">
          <span className="mr-3 w-48 text-right inline-block">First name:</span>
          <TextInput defaultValue="" onChange={changeText('firstName')} className="grow" />
        </label>
      </div>
      <div className="my-3">
        <label className="flex">
          <span className="mr-3 w-48 text-right inline-block">Last name:</span>
          <TextInput defaultValue="" onChange={changeText('lastName')} className="grow" />
        </label>
      </div>
      <div className="my-3">
        <label className="flex">
          <span className="mr-3 w-48 text-right inline-block">Description:</span>
          <TextInput defaultValue="" onChange={changeText('description')} className="grow" />
        </label>
      </div>
      <div className="my-3">
        <label className="flex">
          <span className="mr-3 w-48 text-right inline-block">Job Title:</span>
          <TextInput defaultValue="" onChange={changeText('jobTitle')} className="grow" />
        </label>
      </div>
      <div className="my-3">
        <label className="flex">
          <span className="mr-3 w-48 text-right inline-block">Workplace:</span>
          <TextInput defaultValue="" onChange={changeText('workplace')} className="grow" />
        </label>
      </div>
      <div className="my-3">
        <RelationBuilder
          contacts={oldContacts}
          mainContact={data}
          relations={data.relations}
          updateRelations={updateRelations}
        />
      </div>
      <div>
        <ActionButton onClick={createContact}>Create!</ActionButton>
      </div>
    </div>
  );
}
