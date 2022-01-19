import * as React from 'react';
import { useParams } from 'react-router';
import useJournalEntry from '../../hooks/useJournalEntry';
import { saveJournalEntry } from '../../services/journal';
import { JournalEntryType } from '../../types/types';
import LoaderUntilResolved from '../LoaderUntilResolved';
import DatePicker from './Editor/DatePicker';
import EntryEditor from './Editor/EntryEditor';
import MoodPicker from './Editor/MoodPicker';
import TitleEditor from './Editor/TitleEditor';

function save(journalEntry: JournalEntryType) {
  saveJournalEntry(journalEntry).then(() => console.log('saved!'));
}

function renderEntryEditor(journalEntry: JournalEntryType) {
  const [modifiedEntry, updateEntry] = React.useState(journalEntry);

  return (
    <div>
      <div className="flex justify-between">
        <DatePicker
          value={modifiedEntry.entryDate}
          updateEntry={updateEntry}
        />
        <button type="button" onClick={() => save(modifiedEntry)}>Save</button>
      </div>
      <div className="flex my-3">
        <MoodPicker value={modifiedEntry.mood} updateEntry={updateEntry} />
        <TitleEditor value={modifiedEntry.title} updateEntry={updateEntry} />
      </div>
      <EntryEditor value={modifiedEntry.entry} updateEntry={updateEntry} />
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
