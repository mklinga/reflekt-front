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
      <span className="text-gray-400 mr-2 absolute top-4 left-6"><SearchIcon /></span>
      <TextInput
        placeholder="Search"
        defaultValue={value}
        onChange={updateValue}
        onKeyPress={onKeyPress}
        className="p-3 pl-12 w-full"
      />
    </div>
  );
}
