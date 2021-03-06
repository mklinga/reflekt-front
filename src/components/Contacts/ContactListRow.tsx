import * as React from 'react';
import StarIcon from '../../icons/StarIcon';
import { Contact } from '../../types/contactTypes';

type Props = {
  contact: Contact;
  isUser: boolean;
}

export default function ContactListRow(props: Props) {
  const { isUser, contact } = props;

  return (
    <span className="flex items-center">
      {isUser
        ? (
          <span title="This is you!" className="inline-block mr-1 text-yellow-500">
            <StarIcon />
          </span>
        )
        : null}
      {`${contact.firstName} ${contact.lastName}`}
    </span>
  );
}
