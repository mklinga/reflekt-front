import * as React from 'react';
import { useDispatch } from 'react-redux';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { saveJournalEntry } from '../../../services/journal';
import { JournalEntryType } from '../../../types/journalTypes';
import DatePicker from './DatePicker';
import EntryEditor from './EntryEditor';
import MoodPicker from './MoodPicker';
import TitleEditor from './TitleEditor';
import { usePrompt } from '../../../utils/routing';
import SaveButton from './SaveButton';
import TagEditor from '../Modules/TagEditor';
import ImageEditor from '../Modules/ImageEditor';
import { parseStringToDate } from '../../../utils/date';
import { updateEntry } from '../../../store/journalEntry/journalEntrySlice';

type Props = {
  journalEntry: JournalEntryType;
};

async function save(
  draft: JournalEntryType,
  dispatch: Dispatch<AnyAction>,
  updateDraft: React.Dispatch<React.SetStateAction<JournalEntryType>>,
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const savedEntry = await saveJournalEntry(draft);
  updateDraft(savedEntry);
  dispatch(updateEntry(savedEntry));
  setIsDirty(false);
}

function handleEdit(
  updateDraft: React.Dispatch<React.SetStateAction<JournalEntryType>>,
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>,
) {
  return function handler(input: React.SetStateAction<JournalEntryType>) {
    setIsDirty(true);
    updateDraft(input);
  };
}

export default function EditorForm(props: Props) {
  const dispatch = useDispatch();
  const { journalEntry } = props;
  const [isDirty, setIsDirty] = React.useState(false);
  const [draft, updateDraft] = React.useState(journalEntry);

  usePrompt('You have made some unsaved changes. Do you want to discard them and leave the editor?', isDirty);

  return (
    <div>
      <div className="flex justify-between">
        <DatePicker
          value={parseStringToDate(draft.entryDate)}
          updateEntry={handleEdit(updateDraft, setIsDirty)}
        />
        <div className="flex items-center">
          <SaveButton
            isDirty={isDirty}
            saveHandler={() => save(draft, dispatch, updateDraft, setIsDirty)}
          />
        </div>
      </div>
      <div className="flex my-3">
        <MoodPicker value={draft.mood} updateEntry={handleEdit(updateDraft, setIsDirty)} />
        <TitleEditor
          value={draft.title}
          updateEntry={handleEdit(updateDraft, setIsDirty)}
        />
      </div>
      <ImageEditor
        data={draft.images}
        entryId={draft.id}
        updateEntry={handleEdit(updateDraft, setIsDirty)}
      />
      <TagEditor
        data={draft.tags}
        entryId={draft.id}
        updateEntry={handleEdit(updateDraft, setIsDirty)}
      />
      <EntryEditor value={draft.entry} updateEntry={handleEdit(updateDraft, setIsDirty)} />
    </div>
  );
}
