import * as React from 'react';
import { JournalEntryType } from '../../types/types';
import EditorForm from './Editor/EditorForm';

export default function JournalEntryCreator() {
  const journalEntry: JournalEntryType = {
    mood: '👍',
    title: 'Title',
    entry: 'Story',
    entryDate: new Date(),
    createdAt: null,
    updatedAt: null,
  };

  return (
    <EditorForm journalEntry={journalEntry} />
  );
}
