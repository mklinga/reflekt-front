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
  id?: string;
  firstname: string;
  lastname: string;
  relations: ContactRelation[];
}
