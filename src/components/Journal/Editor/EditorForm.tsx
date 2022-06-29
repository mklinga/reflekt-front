import * as React from 'react';
import { saveJournalEntry } from '../../../services/journal';
import { JournalEntryType } from '../../../types/types';
import DatePicker from './DatePicker';
import EntryEditor from './EntryEditor';
import MoodPicker from './MoodPicker';
import TitleEditor from './TitleEditor';
import { usePrompt } from '../../../utils/routing';
import SaveButton from './SaveButton';
import TagEditor from '../Modules/TagEditor';
import ImageEditor from '../Modules/ImageEditor';
import { parseStringToDate } from '../../../utils/date';

type Props = {
  journalEntry: JournalEntryType;
};

async function save(
  journalEntry: JournalEntryType,
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>,
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const savedEntry = await saveJournalEntry(journalEntry);
  updateEntry(savedEntry);
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
  const { journalEntry } = props;
  const [isDirty, setIsDirty] = React.useState(false);
  const [modifiedEntry, updateEntry] = React.useState(journalEntry);

  usePrompt('You have made some unsaved changes. Do you want to discard them and leave the editor?', isDirty);

  return (
    <div>
      <div className="flex justify-between">
        <DatePicker
          value={parseStringToDate(modifiedEntry.entryDate)}
          updateEntry={handleEdit(updateEntry, setIsDirty)}
        />
        <div className="flex items-center">
          <SaveButton
            isDirty={isDirty}
            saveHandler={() => save(modifiedEntry, updateEntry, setIsDirty)}
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
      <ImageEditor
        data={modifiedEntry.images}
        entryId={modifiedEntry.id}
        updateEntry={handleEdit(updateEntry, setIsDirty)}
      />
      <TagEditor
        data={modifiedEntry.tags}
        entryId={modifiedEntry.id}
        updateEntry={handleEdit(updateEntry, setIsDirty)}
      />
      <EntryEditor value={modifiedEntry.entry} updateEntry={handleEdit(updateEntry, setIsDirty)} />
    </div>
  );
}
