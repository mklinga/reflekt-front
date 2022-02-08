import * as React from 'react';
import CheckIcon from '../../../icons/CheckIcon';
import classes from '../../../utils/classes';

type Props = {
  saveHandler: (e: React.MouseEvent) => Promise<void>;
}

export default function SaveButton(props: Props) {
  const { saveHandler } = props;
  const [checkVisible, setCheckVisible] = React.useState(false);

  async function onSave(e: React.MouseEvent) {
    await saveHandler(e);
    setCheckVisible(true);

    setTimeout(() => setCheckVisible(false), 5000);
  }

  const checkColorClass = classes([
    'transition-colors',
    'duration-500',
    checkVisible ? 'text-green-400' : 'text-transparent',
  ]);
  const buttonClass = classes([
    'transition-colors',
    'duration-500',
    'mr-3',
    'flex',
    'items-center',
    checkVisible && 'text-green-400',
  ]);

  return (
    <button className={buttonClass} type="button" onClick={onSave}>
      <span className={checkColorClass}><CheckIcon /></span>
      Save
    </button>
  );
}
