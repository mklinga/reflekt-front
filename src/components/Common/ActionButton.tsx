import * as React from 'react';
import classes from '../../utils/classes';

type Props = {
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
  secondary?: boolean;
}

export default function ActionButton(props: Props) {
  const { onClick, children, secondary } = props;
  const className = classes([
    'rounded py-1 px-2 border',
    secondary
      ? 'bg-neutral-100 hover:bg-neutral-200 text-black border-neutral-300'
      : 'bg-sky-500 hover:bg-sky-600 text-white border-sky-700',
  ]);

  return (
    <button className={className} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

ActionButton.defaultProps = {
  secondary: false,
};
