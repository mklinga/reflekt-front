import * as React from 'react';
import { useParams } from 'react-router';
import useJournalEntry from '../../hooks/useJournalEntry';
import { JournalEntryType } from '../../types/types';
import LoaderUntilResolved from '../LoaderUntilResolved';

function renderEntryEditor(journalEntry: JournalEntryType) {
  return (
    <div>
      editor:
      {journalEntry.id}
    </div>
  );
}

export default function JournalEntryEditor() {
  const params = useParams();
  const { journalEntry, loadingStatus } = useJournalEntry(params.id);

  return (
    <LoaderUntilResolved
      loadingStatus={loadingStatus}
      render={() => renderEntryEditor(journalEntry)}
    />
  );
}
