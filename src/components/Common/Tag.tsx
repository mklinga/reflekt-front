import * as React from 'react';
import { TagModuleDto } from '../../types/types';

type Props = {
  tag: TagModuleDto;
  simple?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Tag(props: Props) {
  const { tag: { name, color }, onClick, simple } = props;
  const style = { color, border: simple ? undefined : `1px solid ${color}` };
  const classes = simple ? 'text-xs mr-1' : 'rounded-md px-1.5 py-0.5 text-xs mr-3';

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
