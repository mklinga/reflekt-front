import * as React from 'react';
import { Link } from 'react-router-dom';
import ImageIcon from '../../icons/ImageIcon';
import { JournalEntryType } from '../../types/types';
import { dateStringToLocale } from '../../utils/date';
import Tag from '../Common/Tag';

type Props = {
  entry: JournalEntryType;
}

export default function JournalListItem(props: Props) {
  const {
    entry: {
      id, mood, title, entryDate, images, tags,
    },
  } = props;
  const linkUrl = `/journal/${id}`;

  return (
    <Link to={linkUrl}>
      <div className="flex p-1 items-center hover:bg-purple-100 cursor-pointer">
        <span className="text-lg md:text-2xl">{mood}</span>
        <div className="flex-grow flex flex-col pl-3 overflow-hidden text-ellipsis">
          <span className="md:text-2xl overflow-hidden text-ellipsis mr-3 whitespace-nowrap">
            {title}
          </span>
          <span className="hidden md:inline-block">
            {tags ? tags.map((tag) => <Tag simple tag={tag} key={tag.id} />) : null}
          </span>
        </div>
        {images.length > 0 ? <span className="text-gray-400 mr-3"><ImageIcon /></span> : null}
        <span className="text-gray-400 text-sm">{dateStringToLocale(entryDate)}</span>
      </div>
    </Link>
  );
}
