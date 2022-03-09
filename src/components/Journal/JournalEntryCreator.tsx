import * as React from 'react';
import { JournalEntryType, JournalModuleDataType } from '../../types/types';
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

  const moduleData: JournalModuleDataType = {};

  return (
    <EditorForm journalEntry={journalEntry} moduleData={moduleData} />
  );
}
