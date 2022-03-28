import * as React from 'react';
import CheckIcon from '../../../icons/CheckIcon';
import classes from '../../../utils/classes';

type Props = {
  isDirty: boolean;
  saveHandler: (e: React.MouseEvent) => Promise<void>;
}

// How long does it take for save animation to reset (ms)
const RESET_INTERVAL = 2500;

export default function SaveButton(props: Props) {
  const { saveHandler, isDirty } = props;
  const [checkVisible, setCheckVisible] = React.useState(false);

  /*
   * We'll need to keep track for component mounting status because we can't reset the check
   * visibility on an unmounted component. Note that due to React internals, using a simple
   * variable doesn't work here - we need to use Ref.
   */
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  async function onSave(e: React.MouseEvent) {
    await saveHandler(e);
    setCheckVisible(true);

    setTimeout(
      () => {
        if (isMounted.current) {
          setCheckVisible(false);
        }
      },
      RESET_INTERVAL,
    );
  }

  const checkColorClass = classes([
    'transition-colors',
    'duration-500',
    checkVisible ? 'text-green-600' : 'text-transparent',
  ]);
  const buttonClass = classes([
    'transition-colors',
    'duration-500',
    'flex',
    'items-center',
    checkVisible && 'text-green-600',
  ]);

  return (
    <button className={buttonClass} type="button" onClick={onSave}>
      <span className={checkColorClass}><CheckIcon /></span>
      Save
      {isDirty ? '!' : null}
    </button>
  );
}
