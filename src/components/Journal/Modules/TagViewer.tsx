import * as React from 'react';
import Tag from '../../Common/Tag';
import { TagType } from '../../../types/journalTypes';

type Props = {
  data: TagType[];
};

export default function TagViewer(props: Props) {
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
