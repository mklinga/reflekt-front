import * as React from 'react';
import { Contact, ContactRelation } from '../../types/contactTypes';

type Props = {
  draftContact?: Contact;
  contacts: Contact[]
}

export default function RelationBuilder(props: Props) {
  const { contacts, draftContact } = props;
  const [relations, setRelations] = React.useState<ContactRelation[]>([]);

  const newRelationClick = () => {
    const newRelationRow: ContactRelation = {
      subject: draftContact || contacts[0],
      predicate: 'isFriendOf',
      object: (draftContact || contacts.length < 2) ? contacts[0] : contacts[1],
    };
    setRelations((oldRelations) => oldRelations.concat(newRelationRow));
  };

  /* Since the relations array doesn't hold a reference, we need to update them manually to reflect
    the draft contact user is creating (in case of modifying the contact name after the relation row
    has been created)
  */
  React.useEffect(() => {
    setRelations((oldRelations) => oldRelations.map((oldRelation) => ({
      object: (oldRelation.object.id === draftContact.id ? draftContact : oldRelation.object),
      subject: (oldRelation.subject.id === draftContact.id ? draftContact : oldRelation.subject),
      predicate: oldRelation.predicate,
    })));
  }, [draftContact]);

  return (
    <div>
      {relations.map((relation) => (
        <div key={`${relation.subject.id}-${relation.predicate}-${relation.object.id}`}>
          <span>{relation.subject.firstname}</span>
          <span className="mx-3">{relation.predicate}</span>
          <span>{relation.object.firstname}</span>
        </div>
      ))}
      <button type="button" className="text-blue-600 mr-3 whitespace-nowrap" onClick={newRelationClick}>
        + Add new relation
      </button>
    </div>
  );
}

RelationBuilder.defaultProps = {
  draftContact: null,
};
