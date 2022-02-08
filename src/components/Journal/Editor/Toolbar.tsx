import * as React from 'react';
import SaveButton from './SaveButton';

type Props = {
  saveHandler: (e: React.MouseEvent) => Promise<void>;
}

const modules = [
  { id: 1, title: 'Picture', icon: 'picture' },
];

export default function Toolbar(props: Props) {
  const { saveHandler } = props;

  return (
    <div className="flex items-center bg-gray-50 w-full p-3 justify-between">
      <div>
        {modules.map((module) => <button key={module.id} type="button">{module.title}</button>)}
      </div>
      <SaveButton saveHandler={saveHandler} />
    </div>
  );
}
