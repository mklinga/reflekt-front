import * as React from 'react';
import { ContactEvent } from '../../types/contactEventTypes';

type Props = {
  event: ContactEvent;
}

export default function ContactEvent(props: Props) {
  const { event: { title, description, eventDate } } = props;
  return (
    <div className="bg-gray-100 p-4 m-4 border border-gray-300 rounded">
      <h2 className="flex justify-between items-center">
        <strong>{title}</strong>
        {' '}
        <span className="text-xs">{eventDate}</span>
      </h2>
      <p>{description}</p>
    </div>
  );
}
