import * as React from 'react';
import { useParams } from 'react-router';
import useJournalEntry from '../../hooks/useJournalEntry';
import LoaderUntilResolved from '../LoaderUntilResolved';
import EditorForm from './Editor/EditorForm';

export default function JournalEntryEditor() {
  const params = useParams();
  const { journalEntry, loadingStatus: entryLoadingStatus } = useJournalEntry(params.id);

  return (
    <LoaderUntilResolved
      loadingStatus={[entryLoadingStatus]}
      render={() => <EditorForm journalEntry={journalEntry} />}
    />
  );
}
