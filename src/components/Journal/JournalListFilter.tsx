import * as React from 'react';
import SearchIcon from '../../icons/SearchIcon';
import debounce from '../../utils/debounce';

const DEBOUNCE_TIME = 500; // Time we wait for another keystroke (in ms)

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function JournalListFilter(props: Props) {
  const { value, setValue } = props;

  const updateValue = debounce((newValue: string) => {
    setValue(newValue);
  }, DEBOUNCE_TIME);

  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    updateValue(e.target.value);
  }

  return (
    <div className="flex justify-center align-center grow">
      <span className="text-gray-400 mr-2"><SearchIcon /></span>
      <input type="text" placeholder="filter" defaultValue={value} onChange={onValueChange} />
    </div>
  );
}
