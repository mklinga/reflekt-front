import { ContactEvent } from '../types/contactEventTypes';
import { fetchJsonData, postJsonData } from '../utils/fetch';

export async function fetchContactEvents(contactId: string) {
  const fetchUrl = `/api/events?contactId=${contactId}`;
  const [data, status] = await fetchJsonData<ContactEvent[]>(fetchUrl);

  if (status === 'SUCCESS') {
    return data;
  }

  console.error('Fetching contact event data failed');
  return [];
}

export async function fetchEventsForJournalEntry(entryId: string) {
  const fetchUrl = `/api/journal/${entryId}/events`;
  const [data, status] = await fetchJsonData<ContactEvent[]>(fetchUrl);

  if (status === 'SUCCESS') {
    return data;
  }

  console.error('Fetching journal events data failed');
  return [];
}

export async function addNewContactEvent(contactEvent: ContactEvent) {
  const url = '/api/events';
  const [data, status] = await postJsonData<ContactEvent>(url, contactEvent);

  if (status === 'SUCCESS') {
    return data;
  }

  console.error('Adding new contact failed', status);
  return null;
}
