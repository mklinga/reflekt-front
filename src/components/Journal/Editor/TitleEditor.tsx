import * as React from 'react';
import { JournalEntryType } from '../../../types/types';

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
    <span className="grow">
      <input
        className="text-2xl w-full"
        type="text"
        value={value || 'Add title'}
        onChange={onChange}
      />
    </span>
  );
}
