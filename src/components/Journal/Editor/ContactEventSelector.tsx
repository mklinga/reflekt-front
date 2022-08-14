import * as React from 'react';
import useEventItems from '../../../hooks/useEventItems';
import CalendarIcon from '../../../icons/CalendarIcon';
import { ContactEvent } from '../../../types/contactEventTypes';
import { JournalEntryType } from '../../../types/journalTypes';

type Props = {
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>;
  entryId: string;
}

export default function ContactEventSelector(props: Props) {
  const { updateEntry, entryId } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);
  const eventItems = useEventItems(entryId).contactEvents;

  const addEventItem = (eventItem: ContactEvent) => () => {
    const eventHolderString = `!!contactevent:${eventItem.id}!!`;
    updateEntry((oldValue) => ({
      ...oldValue,
      entry: oldValue.entry + eventHolderString,
    }));
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible((oldValue) => !oldValue);
  };

  return (
    <div className="relative">
      <button type="button" onClick={toggleMenu}>
        <CalendarIcon />
      </button>
      {menuVisible ? (
        <div className="absolute right-0 top-full z-10 bg-white border border-black p-4 whitespace-nowrap">
          {eventItems.map((eventItem) => (
            <button
              className="block"
              key={eventItem.id}
              type="button"
              onClick={addEventItem(eventItem)}
            >
              {eventItem.title}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
