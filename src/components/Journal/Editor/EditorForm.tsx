import * as React from 'react';
import { saveJournalEntry } from '../../../services/journal';
import { JournalEntryType } from '../../../types/types';
import DatePicker from './DatePicker';
import EntryEditor from './EntryEditor';
import MoodPicker from './MoodPicker';
import TitleEditor from './TitleEditor';

type Props = {
  journalEntry: JournalEntryType;
};

function save(journalEntry: JournalEntryType) {
  saveJournalEntry(journalEntry);
}

export default function EditorForm(props: Props) {
  const { journalEntry } = props;
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
