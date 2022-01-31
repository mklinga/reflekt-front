import * as React from 'react';

type Props = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function Overlay(props: Props) {
  const { onClick } = props;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-10" onClick={onClick} role="presentation">&nbsp;</div>
  );
}
