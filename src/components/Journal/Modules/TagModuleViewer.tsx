import * as React from 'react';
import Tag from '../../Common/Tag';
import { TagModuleDto } from '../../../types/types';

type Props = {
  data: TagModuleDto[];
};

export default function TagModuleViewer(props: Props) {
  const { data } = props;

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <div>
      {data.map((tag) => <Tag key={tag.id} tag={tag} />)}
    </div>
  );
}
