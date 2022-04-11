import * as React from 'react';
import { TagModuleDto } from '../../types/types';

type Props = {
  tag: TagModuleDto;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Tag(props: Props) {
  const { tag: { name, color, id }, onClick } = props;
  const style = { color, border: `1px solid ${color}` };

  return (
    <button onClick={onClick} type="button" className="rounded-md px-1.5 py-0.5 text-xs mr-3" style={style}>
      {name}
    </button>
  );
}

Tag.defaultProps = {
  onClick: undefined,
};
