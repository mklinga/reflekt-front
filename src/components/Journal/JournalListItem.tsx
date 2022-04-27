import * as React from 'react';
import { Link } from 'react-router-dom';
import ImageIcon from '../../icons/ImageIcon';
import { JournalListItemType } from '../../types/types';
import Tag from '../Common/Tag';

type Props = {
  entry: JournalListItemType;
}

export default function JournalListItem(props: Props) {
  const {
    entry: {
      id, mood, title, entryDate, hasImages, tags,
    },
  } = props;
  const linkUrl = `/journal/${id}`;

  return (
    <Link to={linkUrl}>
      <div className="flex p-1 items-center hover:bg-purple-100 cursor-pointer">
        <span className="text-2xl">{mood}</span>
        <div className="flex-grow pl-3">
          <span className="text-2xl block">{title}</span>
          <span>{tags ? tags.map((tag) => <Tag simple tag={tag} key={tag.id} />) : null}</span>
        </div>
        {hasImages ? <span className="text-gray-400 mr-3"><ImageIcon /></span> : null}
        <span className="text-gray-400 text-sm">{entryDate.toLocaleDateString()}</span>
      </div>
    </Link>
  );
}
