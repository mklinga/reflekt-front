import * as React from 'react';
import { JournalEntryType } from '../../../types/journalTypes';
import countWords from '../../../utils/wordcount';

type Props = {
  value: string;
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>;
}

export default function EntryEditor(props: Props) {
  const { value, updateEntry } = props;
  const [wordCount, setWordCount] = React.useState(0);

  React.useEffect(() => {
    countWords(value).then(setWordCount);
  }, [value]);

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    updateEntry((journalEntry) => ({ ...journalEntry, entry: e.target.value }));
  }

  return (
    <div className="relative">
      <span className="absolute left-full pl-3 whitespace-nowrap text-gray-400 text-sm">
        {wordCount || ''}
      </span>
      <textarea
        placeholder="Add your story"
        className="w-full min-h-[50vh] border border-black p-[2px]"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
