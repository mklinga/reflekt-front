import * as React from 'react';
import { JournalEntryType } from '../../../types/types';

type Props = {
  value: string;
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>;
}

function isWhiteSpace(character: string) {
  return (character === '\n' || character === ' ');
}

/* There is ABSOLUTELY no need for this to be async, but I wanted to do it this way */
async function countWords(text: string) {
  return new Promise((resolve) => {
    let count = 0;
    let index = 0;
    function loop() {
      if (isWhiteSpace(text[index]) && !isWhiteSpace(text[index - 1])) {
        count += 1;
      }

      index += 1;

      if (index === text.length) {
        if (!isWhiteSpace(text[index - 1])) {
          count += 1;
        }
        resolve(count);
      } else if (index % 100 === 0) {
        setTimeout(loop, 0);
      } else {
        loop();
      }
    }

    loop();
  });
}

export default function EntryEditor(props: Props) {
  const { value, updateEntry } = props;
  const [wordCount, setWordCount] = React.useState(0);

  React.useEffect(() => {
    countWords(value).then(setWordCount);
  }, []);

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    countWords(e.target.value).then(setWordCount);
    updateEntry((journalEntry) => ({ ...journalEntry, entry: e.target.value }));
  }

  return (
    <div className="relative">
      <span className="absolute left-full pl-3 whitespace-nowrap text-gray-400 text-sm">
        {wordCount || ''}
      </span>
      <textarea
        className="w-full min-h-[50vh] border border-black p-[2px]"
        value={value || 'Add your story'}
        onChange={onChange}
      />
    </div>
  );
}
