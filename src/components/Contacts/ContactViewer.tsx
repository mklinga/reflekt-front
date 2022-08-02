import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import ContactEvent from './ContactEvent';
import useContact from '../../hooks/useContact';
import useContactEvents from '../../hooks/useContactEvents';
import H2 from '../Common/headers/H2';
import H1 from '../Common/headers/H1';
import ActionButton from '../Common/ActionButton';

export default function ContactViewer() {
  const params = useParams();
  const navigate = useNavigate();
  const { loadingStatus: contactLoadingStatus, contact } = useContact(params.id);
  const { loadingStatus: eventsLoadingStatus, contactEvents } = useContactEvents(params.id);

  if (contactLoadingStatus !== 'resolved' || eventsLoadingStatus !== 'resolved') {
    return <span>Loading...</span>;
  }

  const addNewEvent = () => {
    navigate(`/events/new?withParticipant=${contact.id}`);
  };

  return (
    <div>
      <H1 className="text-center my-4">{`${contact.firstName} ${contact.lastName}`}</H1>
      <div>
        <H2 className="pl-4 flex justify-between items-center">
          Events
          <ActionButton onClick={addNewEvent}>
            Add new event
          </ActionButton>
        </H2>
        {contactEvents.map((event) => <ContactEvent key={event.id} event={event} />)}
      </div>
    </div>
  );
}
