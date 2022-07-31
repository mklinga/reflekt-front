import * as React from 'react';
import { fetchContactEvents } from '../services/contactEvents';
import { ContactEvent } from '../types/contactEventTypes';
import { LoadingStatus } from '../types/types';

export type ContactEventHook = {
  contactEvents: ContactEvent[];
  loadingStatus: LoadingStatus;
}

export default function useContactEvents(contactId: string): ContactEventHook {
  const [loaded, setLoaded] = React.useState(false);
  const [contactEvents, setContactEvents] = React.useState([]);

  React.useEffect(() => {
    setLoaded(false);
    fetchContactEvents(contactId).then((events) => {
      setContactEvents(events);
      setLoaded(true);
    });
  }, [contactId]);

  return {
    contactEvents,
    loadingStatus: loaded ? 'resolved' : 'loading',
  };
}
