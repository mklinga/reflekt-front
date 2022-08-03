import { Contact } from './contactTypes';

export type ContactEventType = 'IN_PERSON' | 'PHONE' | 'VIDEO_CALL';

export type ContactEvent = {
  id: string;
  title: string;
  description: string;
  eventDate: string; // YYYY-MM-DD
  eventType: ContactEventType;
  participants: Contact[];
}
