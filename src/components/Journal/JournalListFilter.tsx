import * as React from 'react';
import { useNavigate } from 'react-router';
import SearchIcon from '../../icons/SearchIcon';
import TextInput from '../Common/TextInput';

export default function JournalListFilter() {
  const [value, setValue] = React.useState('');
  const navigate = useNavigate();

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyPress = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      navigate(`/search/?query=${encodeURIComponent(value)}`);
    }
  }, [value]);

  return (
    <div className="relative w-6/12 mx-auto my-9">
      <span className="text-gray-400 text-xl mr-2 absolute top-[5px] left-1"><SearchIcon /></span>
      <TextInput
        placeholder="Search"
        defaultValue={value}
        onChange={updateValue}
        onKeyPress={onKeyPress}
        className="pl-7 w-full text-xl"
      />
    </div>
  );
}
