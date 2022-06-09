import * as React from 'react';

type Props = {
  label?: string;
  info: React.ReactNode;
}

export default function HighlightItem(props: Props) {
  const { label, info } = props;

  return (
    <div className="inline-block text-center bg-blue-100 p-6 rounded ">
      <h4 className="uppercase text-neutral-500">{label}</h4>
      <span className="text-5xl">{info}</span>
    </div>
  );
}

HighlightItem.defaultProps = {
  label: null,
};
