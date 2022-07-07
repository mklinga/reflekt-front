import * as React from 'react';
import { Contact, ContactPredicate, ContactRelation } from '../../types/contactTypes';

type Props = {
  mainContact?: Contact;
  contacts: Contact[]
  relations: ContactRelation[];
  updateRelations: (relations: ContactRelation[]) => void;
}

const predicates: ContactPredicate[] = [
  'isColleagueOf',
  'isFatherOf',
  'isFriendOf',
  'isMotherOf',
  'isSiblingOf',
];
const predicateOptions = predicates
  .map((predicate) => <option key={predicate} value={predicate}>{predicate}</option>);

function contactName(contact: Contact) {
  return `${contact.firstname} ${contact.lastname}`;
}

export default function RelationBuilder(props: Props) {
  const {
    contacts, mainContact, relations, updateRelations,
  } = props;

  const contactOptions = [mainContact].concat(contacts)
    .map((contactItem) => (
      <option key={contactItem.id} value={contactItem.id}>
        {contactName(contactItem)}
      </option>
    ));

  const newRelationClick = () => {
    const newRelationRow: ContactRelation = {
      subject: mainContact || contacts[0],
      predicate: 'isFriendOf',
      object: (mainContact || contacts.length < 2) ? contacts[0] : contacts[1],
    };
    updateRelations(relations.concat(newRelationRow));
  };

  const findContactById = (id: string) => {
    if (mainContact.id === id) {
      return mainContact;
    }

    return contacts.find((contact) => contact.id === id);
  };

  type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
  const onSelectChange = (field: keyof ContactRelation, row: number) => (e: SelectEvent) => {
    updateRelations(relations.map((oldRelationRow, index) => ((index === row)
      ? {
        ...oldRelationRow,
        [field]: (field === 'predicate') ? e.target.value : findContactById(e.target.value),
      }
      : oldRelationRow)));
  };

  const removeRelation = (removeIndex: number) => () => {
    updateRelations(relations.filter((relation, index) => index !== removeIndex));
  };
  return (
    <div>
      {relations.map(({ subject, predicate, object }, index) => (
        <div className="flex relative justify-center" key={`${subject.id}-${predicate}-${object.id}`}>
          <select className="border p-3 m-3" value={subject.id} onChange={onSelectChange('subject', index)}>
            {contactOptions}
          </select>
          <select className="border p-3 m-3" value={predicate} onChange={onSelectChange('predicate', index)}>
            {predicateOptions}
          </select>
          <select className="border p-3 m-3" value={object.id} onChange={onSelectChange('object', index)}>
            {contactOptions}
          </select>
          <button
            className="absolute right-0 text-red-400 hover:text-red-600 inset-y-0"
            type="button"
            onClick={removeRelation(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="text-blue-600 mr-3 whitespace-nowrap" onClick={newRelationClick}>
        + Add new relation
      </button>
    </div>
  );
}

RelationBuilder.defaultProps = {
  mainContact: null,
};
