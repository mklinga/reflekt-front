import * as React from 'react';
import { JournalEntryType } from '../../types/types';
import EditorForm from './Editor/EditorForm';

export default function JournalEntryCreator() {
  const journalEntry: JournalEntryType = {
    mood: '😶',
    title: 'It\'s a new day',
    entry: 'Tell your story',
    entryDate: new Date(),
    createdAt: null,
    updatedAt: null,
    tags: [],
    images: [],
  };

  return (
    <EditorForm journalEntry={journalEntry} />
  );
}
