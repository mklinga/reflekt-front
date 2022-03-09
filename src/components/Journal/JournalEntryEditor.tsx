import * as React from 'react';
import { useParams } from 'react-router';
import useJournalEntry from '../../hooks/useJournalEntry';
import useJournalModules from '../../hooks/useJournalModules';
import LoaderUntilResolved from '../LoaderUntilResolved';
import EditorForm from './Editor/EditorForm';

export default function JournalEntryEditor() {
  const params = useParams();
  const { journalEntry, loadingStatus: entryLoadingStatus } = useJournalEntry(params.id);
  const { moduleData, loadingStatus: moduleLoadingStatus } = useJournalModules(params.id);

  return (
    <LoaderUntilResolved
      loadingStatus={[entryLoadingStatus, moduleLoadingStatus]}
      render={() => <EditorForm journalEntry={journalEntry} moduleData={moduleData} />}
    />
  );
}
