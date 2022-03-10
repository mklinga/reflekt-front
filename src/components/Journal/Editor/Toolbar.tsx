import * as React from 'react';
import SaveButton from './SaveButton';

type Props = {
  saveHandler: (e: React.MouseEvent) => Promise<void>;
}

export default function Toolbar(props: Props) {
  const { saveHandler } = props;

  return (
    <div className="flex items-center bg-gray-50 w-full p-3 justify-between">
      <SaveButton saveHandler={saveHandler} />
    </div>
  );
}
