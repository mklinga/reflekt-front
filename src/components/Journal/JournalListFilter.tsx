import * as React from 'react';
import { useNavigate } from 'react-router';
import SearchIcon from '../../icons/SearchIcon';
import debounce from '../../utils/debounce';
import TextInput from '../Common/TextInput';

const DEBOUNCE_TIME = 500; // Time we wait for another keystroke (in ms)

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function JournalListFilter(props: Props) {
  const { value, setValue } = props;
  const navigate = useNavigate();

  const updateValue = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, DEBOUNCE_TIME);

  const onKeyPress = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigate(`/search/${value}`);
    }
  }, [value]);

  return (
    <div className="relative">
      <span className="text-gray-400 mr-2 absolute top-[3px] left-0.5"><SearchIcon /></span>
      <TextInput
        placeholder="filter"
        defaultValue={value}
        onChange={updateValue}
        onKeyPress={onKeyPress}
        className="pl-6"
      />
    </div>
  );
}
