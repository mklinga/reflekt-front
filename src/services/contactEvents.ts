import { ContactEvent } from '../types/contactEventTypes';
import { fetchJsonData } from '../utils/fetch';

export async function fetchContactEvents(contactId: string) {
  const fetchUrl = `/api/events?contactId=${contactId}`;
  const [data, status] = await fetchJsonData<ContactEvent[]>(fetchUrl);

  if (status === 'SUCCESS') {
    return data;
  }

  console.error('Fetching contact event data failed');
  return [];
}
