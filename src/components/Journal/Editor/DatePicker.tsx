import * as React from 'react';
import { JournalEntryType } from '../../../types/types';
import { getISODateString } from '../../../utils/date';

type Props = {
  value: Date;
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>;
}

export default function DatePicker(props: Props) {
  const { value, updateEntry } = props;

  function onChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    updateEntry((entry) => ({
      ...entry,
      entryDate: new Date(Date.parse(changeEvent.target.value)),
    }));
  }

  return (
    <div className="flex align-center">
      <input type="date" value={getISODateString(value)} onChange={onChange} required />
    </div>
  );
}
