import * as React from 'react';
import { TagModuleDto } from '../../types/types';

type Props = {
  tag: TagModuleDto;
}

export default function Tag(props: Props) {
  const { tag: { name, color, id } } = props;
  const style = { color, border: `1px solid ${color}` };

  return <span className="rounded-md px-1.5 py-0.5 text-xs mr-3" style={style}>{name}</span>;
}
