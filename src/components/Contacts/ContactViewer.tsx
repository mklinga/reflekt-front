import * as React from 'react';
import { useParams } from 'react-router';
import useContact from '../../hooks/useContact';
import useContactEvents from '../../hooks/useContactEvents';

export default function ContactViewer() {
  const params = useParams();
  const { loadingStatus: contactLoadingStatus, contact } = useContact(params.id);
  const { loadingStatus: eventsLoadingStatus, contactEvents } = useContactEvents(params.id);

  if (contactLoadingStatus !== 'resolved' || eventsLoadingStatus !== 'resolved') {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <h1>{contact.id}</h1>
      <div>
        {contactEvents.map((event) => (
          <h2 key={event.id}>
            {event.id}
            {' '}
            -
            {' '}
            {event.title}
          </h2>
        ))}
      </div>
    </div>
  );
}
