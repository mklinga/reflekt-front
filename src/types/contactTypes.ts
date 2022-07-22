/* eslint-disable no-use-before-define */

export type ContactPredicate = 'isFriendOf'
  | 'isMotherOf'
  | 'isFatherOf'
  | 'isSiblingOf'
  | 'isColleagueOf';

export type ContactRelation = {
  subject: Contact;
  predicate: ContactPredicate;
  object: Contact;
}

export type Contact = {
  id: string;
  firstName: string;
  lastName: string;
  relations: ContactRelation[];
}
