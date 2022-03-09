import * as React from 'react';
import { saveJournalEntry } from '../../../services/journal';
import { JournalEntryType, JournalModuleDataType } from '../../../types/types';
import DatePicker from './DatePicker';
import EntryEditor from './EntryEditor';
import MoodPicker from './MoodPicker';
import TitleEditor from './TitleEditor';
import Toolbar from './Toolbar';
import ModuleDataEditor from './ModuleDataEditor';

type Props = {
  journalEntry: JournalEntryType;
  moduleData: JournalModuleDataType;
};

async function save(
  journalEntry: JournalEntryType,
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>,
) {
  const savedEntry = await saveJournalEntry(journalEntry);
  updateEntry(savedEntry);
}

export default function EditorForm(props: Props) {
  const { journalEntry, moduleData } = props;
  const [modifiedEntry, updateEntry] = React.useState(journalEntry);
  const [modifiedModuleData, updateModuleData] = React.useState(moduleData);

  return (
    <div>
      <div className="flex justify-between">
        <Toolbar saveHandler={() => save(modifiedEntry, updateEntry)} />
      </div>
      <div className="flex my-3">
        <MoodPicker value={modifiedEntry.mood} updateEntry={updateEntry} />
        <TitleEditor value={modifiedEntry.title} updateEntry={updateEntry} />
        <DatePicker
          value={modifiedEntry.entryDate}
          updateEntry={updateEntry}
        />
      </div>
      <ModuleDataEditor moduleData={modifiedModuleData} updateModuleData={updateModuleData} />
      <EntryEditor value={modifiedEntry.entry} updateEntry={updateEntry} />
    </div>
  );
}
