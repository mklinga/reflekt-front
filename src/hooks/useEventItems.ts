import * as React from 'react';
import { fetchEventsForJournalEntry } from '../services/contactEvents';
import { ContactEvent } from '../types/contactEventTypes';
import { LoadingStatus } from '../types/types';

export type ContactEventHook = {
  contactEvents: ContactEvent[];
  loadingStatus: LoadingStatus;
}

export default function useEventItems(journalEntryId: string): ContactEventHook {
  const [loaded, setLoaded] = React.useState(false);
  const [contactEvents, setContactEvents] = React.useState([]);

  React.useEffect(() => {
    setLoaded(false);
    fetchEventsForJournalEntry(journalEntryId).then((events) => {
      setContactEvents(events);
      setLoaded(true);
    });
  }, [journalEntryId]);

  return {
    contactEvents,
    loadingStatus: loaded ? 'resolved' : 'loading',
  };
}
