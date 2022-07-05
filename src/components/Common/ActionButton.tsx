import * as React from 'react';

type Props = {
  onClick: React.MouseEventHandler;
  children: React.ReactNode;
}

export default function ActionButton(props: Props) {
  const { onClick, children } = props;

  return (
    <button
      className="rounded bg-sky-500 hover:bg-sky-600 text-white py-1 px-3"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
