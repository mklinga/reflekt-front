import * as React from 'react';
import { JournalEntryType } from '../../../types/types';

type Props = {
  value: string;
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>;
}

export default function EntryEditor(props: Props) {
  const { value, updateEntry } = props;

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    updateEntry((journalEntry) => ({ ...journalEntry, entry: e.target.value }));
  }

  return (
    <div>
      <textarea
        className="w-full min-h-[50vh] border border-black p-[2px]"
        value={value || 'Add your story'}
        onChange={onChange}
      />
    </div>
  );
}
