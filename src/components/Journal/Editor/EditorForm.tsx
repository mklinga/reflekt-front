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

async function save(
  journalEntry: JournalEntryType,
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>,
) {
  const savedEntry = await saveJournalEntry(journalEntry);
  updateEntry(savedEntry);
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
        <button type="button" onClick={() => save(modifiedEntry, updateEntry)}>Save</button>
      </div>
      <div className="flex my-3">
        <MoodPicker value={modifiedEntry.mood} updateEntry={updateEntry} />
        <TitleEditor value={modifiedEntry.title} updateEntry={updateEntry} />
      </div>
      <EntryEditor value={modifiedEntry.entry} updateEntry={updateEntry} />
    </div>
  );
}
