import * as React from 'react';
import StarIcon from '../../icons/StarIcon';
import { Contact } from '../../types/contactTypes';
import Link from '../Common/Link';

type Props = {
  contact: Contact;
  isUser: boolean;
}

export default function ContactListRow(props: Props) {
  const { isUser, contact } = props;

  return (
    <div className="grid grid-cols-3">
      <span className="flex items-center">
        {isUser
          ? (
            <span title="This is you!" className="inline-block mr-1 text-yellow-500">
              <StarIcon />
            </span>
          )
          : null}
        <Link to={`/contacts/${contact.id}`}>
          {`${contact.lastName ? `${contact.lastName}, ` : ''}${contact.firstName}`}
        </Link>
      </span>
      <span>{contact.jobTitle}</span>
      <span>{contact.workplace}</span>
    </div>
  );
}
