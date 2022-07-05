import * as React from 'react';
import { JournalEntryType } from '../../../types/journalTypes';

type Props = {
  value: string;
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>;
}

export default function MoodPicker(props: Props) {
  const { value, updateEntry } = props;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value && !e.target.value.match(/^\p{Emoji}$/gu)) {
      console.warn('Ignoring invalid mood', e.target.value);
      return;
    }

    updateEntry((entry) => ({ ...entry, mood: e.target.value }));
  }

  return (
    <span>
      <input
        className="text-2xl w-8 mr-3"
        type="text"
        value={value}
        onChange={onChange}
      />
    </span>
  );
}
