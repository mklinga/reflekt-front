import * as React from 'react';
import { useSelector } from 'react-redux';
import { addNewContactEvent } from '../../services/contactEvents';
import { selectContacts } from '../../store/contacts/contactSelector';
import { ContactEvent } from '../../types/contactEventTypes';
import { getISODateString } from '../../utils/date';
import ActionButton from '../Common/ActionButton';
import H1 from '../Common/headers/H1';
import TextArea from '../Common/TextArea';
import TextInput from '../Common/TextInput';

const initialEventDraft: ContactEvent = {
  id: '00000000-0000-0000-0000-000000000000',
  title: '',
  description: '',
  eventDate: getISODateString(new Date()),
  eventType: 'IN_PERSON',
  participants: [],
};

export default function ContactEventCreator() {
  const contacts = useSelector(selectContacts);
  const [draft, setDraft] = React.useState(initialEventDraft);

  const createEvent = async () => {
    /* TODO: validate before sending */
    const createdEvent = await addNewContactEvent(draft);
    console.log('Created', createdEvent);
  };

  const changeInputValue = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft((old) => ({ ...old, [field]: e.target.value }));
  };

  const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft((old) => ({ ...old, description: e.target.value }));
  };

  const changeParticipants = (e: React.ChangeEvent<HTMLInputElement>) => {
    const textValue = e.target.value;
    if (!textValue || textValue.length < 36) {
      setDraft((old) => ({ ...old, participants: [] }));
      return;
    }

    const participantIds = e.target.value.split(',').map((item) => item.trim());
    const participants = participantIds
      .map((id) => contacts.find((contact) => contact.id === id))
      .filter((x) => x);

    setDraft((old) => ({ ...old, participants }));
  };

  return (
    <div>
      <H1 className="flex justify-between items-center">
        Create new Event
        {' '}
        <ActionButton onClick={createEvent}>Save</ActionButton>
      </H1>
      <div className="mt-5">
        <div className="my-3">
          <label className="flex">
            <span className="mr-3 w-48 text-right inline-block">Title</span>
            <TextInput
              defaultValue={draft.title}
              className="grow"
              onChange={changeInputValue('title')}
            />
          </label>
        </div>
        <div className="my-3">
          <label className="flex">
            <span className="mr-3 w-48 text-right inline-block">Date</span>
            <TextInput
              defaultValue={draft.eventDate}
              className="grow"
              onChange={changeInputValue('eventDate')}
            />
          </label>
        </div>
        <div className="my-3">
          <label className="flex">
            <span className="mr-3 w-48 text-right inline-block">Type</span>
            <TextInput
              defaultValue={draft.eventType}
              className="grow"
              onChange={changeInputValue('eventType')}
            />
          </label>
        </div>
        <div className="my-3">
          <label className="flex">
            <span className="mr-3 w-48 text-right inline-block">Participants</span>
            <TextInput
              defaultValue={draft.participants.join(', ')}
              className="grow"
              onChange={changeParticipants}
            />
          </label>
        </div>
        <div className="my-3">
          <label className="flex">
            <span className="mr-3 w-48 text-right inline-block">Description</span>
            <TextArea
              defaultValue={draft.description}
              className="grow h-96"
              onChange={changeDescription}
            />
          </label>
        </div>
      </div>
    </div>
  );
}
