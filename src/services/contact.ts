import { Contact } from '../types/contactTypes';
import { fetchJsonData } from '../utils/fetch';

export async function fetchContacts() {
  const fetchUrl = '/api/contacts';
  const [data, status] = await fetchJsonData<Contact[]>(fetchUrl);

  if (status === 'SUCCESS') {
    return data;
  }

  console.error('Fetching contacts failed', status);
  return [];
}
