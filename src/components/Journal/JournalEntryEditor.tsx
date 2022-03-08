import * as React from 'react';
import { useParams } from 'react-router';
import useJournalEntry from '../../hooks/useJournalEntry';
import useJournalModules from '../../hooks/useJournalModules';
import LoaderUntilResolved from '../LoaderUntilResolved';
import EditorForm from './Editor/EditorForm';

export default function JournalEntryEditor() {
  const params = useParams();
  const { journalEntry, loadingStatus: entryLoadingStatus } = useJournalEntry(params.id);
  const { moduleData, loadingStatus: moduleLoadingStatus } = useJournalModules(/* params.id */ 'faec0242-0f7e-4222-8a2f-b3d4253884f8');

  return (
    <LoaderUntilResolved
      loadingStatus={[entryLoadingStatus, moduleLoadingStatus]}
      render={() => <EditorForm journalEntry={journalEntry} moduleData={moduleData} />}
    />
  );
}
