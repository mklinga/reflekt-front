import * as React from 'react';
import { saveJournalEntry } from '../../../services/journal';
import { JournalEntryType, JournalModuleDataType } from '../../../types/types';
import DatePicker from './DatePicker';
import EntryEditor from './EntryEditor';
import MoodPicker from './MoodPicker';
import TitleEditor from './TitleEditor';
import ModuleDataEditor from './ModuleDataEditor';
import { usePrompt } from '../../../utils/routing';
import SaveButton from './SaveButton';
import { saveModuleData } from '../../../services/modules';

type Props = {
  journalEntry: JournalEntryType;
  moduleData: JournalModuleDataType;
};

async function save(
  journalEntry: JournalEntryType,
  moduleData: JournalModuleDataType,
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>,
  // updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>,
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const savedEntry = await saveJournalEntry(journalEntry);
  /* const savedModuleData = */ await saveModuleData(savedEntry.id, moduleData);
  updateEntry(savedEntry);
  // updateModuleData(savedModuleData);
  setIsDirty(false);
}

function handleEdit(
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>,
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>,
) {
  return function handler(input: React.SetStateAction<JournalEntryType>) {
    setIsDirty(true);
    updateEntry(input);
  };
}

export default function EditorForm(props: Props) {
  const { journalEntry, moduleData } = props;
  const [isDirty, setIsDirty] = React.useState(false);
  const [modifiedEntry, updateEntry] = React.useState(journalEntry);
  const [modifiedModuleData, updateModuleData] = React.useState(moduleData);

  usePrompt('You have made some unsaved changes. Do you want to discard them and leave the editor?', isDirty);

  return (
    <div>
      <div className="flex justify-between">
        <DatePicker
          value={modifiedEntry.entryDate}
          updateEntry={handleEdit(updateEntry, setIsDirty)}
        />
        <div className="flex items-center">
          <SaveButton
            isDirty={isDirty}
            saveHandler={() => save(modifiedEntry, modifiedModuleData, updateEntry, setIsDirty)}
          />
        </div>
      </div>
      <div className="flex my-3">
        <MoodPicker value={modifiedEntry.mood} updateEntry={handleEdit(updateEntry, setIsDirty)} />
        <TitleEditor
          value={modifiedEntry.title}
          updateEntry={handleEdit(updateEntry, setIsDirty)}
        />
      </div>
      <ModuleDataEditor
        moduleData={modifiedModuleData}
        updateModuleData={updateModuleData}
        entryId={modifiedEntry.id}
        setIsDirty={setIsDirty}
      />
      <EntryEditor value={modifiedEntry.entry} updateEntry={handleEdit(updateEntry, setIsDirty)} />
    </div>
  );
}
