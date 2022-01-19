import * as React from 'react';
import { JournalEntryType } from '../../../types/types';
import { getISODateString } from '../../../utils/date';

type Props = {
  value: Date;
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>;
}

export default function DatePicker(props: Props) {
  const { value, updateEntry } = props;

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateEntry((entry) => ({ ...entry, entryDate: new Date(Date.parse(e.target.value)) }));
  }

  return (
    <div>
      <input type="date" value={getISODateString(value)} onChange={onChange} />
    </div>
  );
}
