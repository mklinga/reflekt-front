import * as React from 'react';
import { JournalEntryType } from '../../../types/journalTypes';

type Props = {
  value: string;
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>;
}

export default function TitleEditor(props: Props) {
  const { value, updateEntry } = props;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateEntry((entry) => ({ ...entry, title: e.target.value }));
  }

  return (
    <span className="grow mr-3">
      <input
        placeholder="Add title"
        className="text-2xl w-full"
        type="text"
        value={value}
        onChange={onChange}
      />
    </span>
  );
}
