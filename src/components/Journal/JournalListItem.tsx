import * as React from 'react';
import { Link } from 'react-router-dom';
import ImageIcon from '../../icons/ImageIcon';
import { JournalListItemType } from '../../types/types';

type Props = {
  entry: JournalListItemType;
}

export default function JournalListItem(props: Props) {
  const {
    entry: {
      id, mood, title, entryDate, hasImages,
    },
  } = props;
  const linkUrl = `/journal/${id}`;

  return (
    <Link to={linkUrl}>
      <div className="flex p-3 items-center hover:bg-purple-100 cursor-pointer">
        <span className="text-2xl">{mood}</span>
        <span className="text-2xl flex-grow pl-3">{title}</span>
        {hasImages ? <span className="text-gray-400 mr-3"><ImageIcon /></span> : null}
        <span className="text-gray-400 text-sm">{entryDate.toLocaleDateString()}</span>
      </div>
    </Link>
  );
}
