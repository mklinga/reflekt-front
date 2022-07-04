import * as React from 'react';
import { Contact } from '../../types/contactTypes';
import ActionButton from '../Common/ActionButton';
import TextInput from '../Common/TextInput';
import RelationBuilder from './RelationBuilder';

/* TODO: read from api */
const oldContacts: Contact[] = [{
  id: '1', firstname: 'Mr.', lastname: 'DemoContact', relations: [],
}];

export default function ContactCreator() {
  const [data, setData] = React.useState<Contact>({
    id: 'DRAFT-CONTACT', firstname: '', lastname: '', relations: [],
  });

  const createContact = () => {
    console.log('Sending data', data);
  };

  const changeText = ((field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((oldData) => ({ ...oldData, [field]: e.target.value }));
  });

  return (
    <div className="w-9/12 text-center mx-auto">
      <h2 className="text-xl mb-3">Add new Contact</h2>
      <div className="my-3">
        <label className="flex">
          <span className="mr-3 w-48 text-right inline-block">First name:</span>
          <TextInput defaultValue="" onChange={changeText('firstname')} className="grow" />
        </label>
      </div>
      <div className="my-3">
        <label htmlFor="last-name" className="flex">
          <span className="mr-3 w-48 text-right inline-block">Last name:</span>
          <TextInput defaultValue="" onChange={changeText('lastname')} className="grow" />
        </label>
      </div>
      <div className="my-3">
        <RelationBuilder contacts={oldContacts} draftContact={data} />
      </div>
      <div>
        <ActionButton onClick={createContact}>Create!</ActionButton>
      </div>
    </div>
  );
}
