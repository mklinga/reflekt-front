import { Contact, ContactPredicate } from '../types/contactTypes';
import { fetchJsonData, postJsonData } from '../utils/fetch';

export async function fetchContacts() {
  const fetchUrl = '/api/contacts';
  const [data, status] = await fetchJsonData<Contact[]>(fetchUrl);

  if (status === 'SUCCESS') {
    return data;
  }

  console.error('Fetching contacts failed', status);
  return [];
}

/* Subject and object in ContactRelationDto are the UUID of the Contact,
   or 00000000-0000-0000-0000-000000000000 for not-yet-saved entities
*/
type ContactRelationDto = {
  subject: string;
  predicate: ContactPredicate;
  object: string;
}

type NewContactDto = {
  id: string;
  firstName: string;
  lastName: string;
  relations: ContactRelationDto[];
}

export async function addNewContact(contact: Contact) {
  const postUrl = '/api/contacts';
  const newContact: NewContactDto = {
    ...contact,
    relations: contact.relations.map((contactRelation) => ({
      subject: contactRelation.subject.id,
      predicate: contactRelation.predicate,
      object: contactRelation.object.id,
    })),
  };

  const [data, status] = await postJsonData<NewContactDto>(postUrl, newContact);

  if (status === 'SUCCESS') {
    return data;
  }

  console.error('Fetching contacts failed', status);
  return null;
}
