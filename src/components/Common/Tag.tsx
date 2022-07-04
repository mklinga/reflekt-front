import * as React from 'react';
import { TagType } from '../../types/journalTypes';

type Props = {
  tag: TagType;
  simple?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Tag(props: Props) {
  const { tag: { name, color }, onClick, simple } = props;
  const style: React.CSSProperties = { color, border: `1px solid ${color}` };
  if (simple) {
    delete style.border;
    delete style.color;
    style.borderBottom = `1px solid ${color}`;
  }
  const classes = simple ? 'text-xs text-gray-400 mr-1 p-1' : 'rounded-md px-1.5 py-0.5 text-xs mr-3 mb-2';

  return (
    <button onClick={onClick} type="button" className={classes} style={style}>
      {name}
    </button>
  );
}

Tag.defaultProps = {
  onClick: undefined,
  simple: false,
};
