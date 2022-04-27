import * as React from 'react';
import { JournalEntryType, JournalModuleDataType } from '../../types/types';
import EditorForm from './Editor/EditorForm';

export default function JournalEntryCreator() {
  const journalEntry: JournalEntryType = {
    mood: '😶',
    title: 'It\'s a new day',
    entry: 'Tell your story',
    entryDate: new Date(),
    createdAt: null,
    updatedAt: null,
  };

  const moduleData: JournalModuleDataType = {
    tags: [],
    images: [],
  };

  return (
    <EditorForm journalEntry={journalEntry} moduleData={moduleData} />
  );
}
