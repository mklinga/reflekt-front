import * as React from 'react';
import SearchIcon from '../../icons/SearchIcon';
import TextInput from '../Common/TextInput';

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function ContactRowFilter(props: Props) {
  const { value, setValue } = props;

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="relative w-6/12 mx-auto my-9">
      <span className="text-gray-400 mr-2 absolute top-4 left-6"><SearchIcon /></span>
      <TextInput
        placeholder="Filter"
        defaultValue={value}
        onChange={updateValue}
        className="p-3 pl-12 w-full"
      />
    </div>
  );
}
