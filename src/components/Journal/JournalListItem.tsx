import * as React from 'react';
import { Link } from 'react-router-dom';
import ImageIcon from '../../icons/ImageIcon';
import { JournalEntryType } from '../../types/journalTypes';
import { dateStringToLocale } from '../../utils/date';
import Tag from '../Common/Tag';

type Props = {
  entry: JournalEntryType;
}

export default function JournalListItem(props: Props) {
  const {
    entry: {
      id, title, entryDate, mood, images, tags,
    },
  } = props;
  const linkUrl = `/journal/${id}`;
  const hasMood = mood && (mood !== '😶');

  return (
    <Link to={linkUrl}>
      <div className="flex p-1 items-center hover:bg-gray-100 border border-transparent hover:border-slate-200 cursor-pointer">
        <div className="flex-grow flex flex-col pl-3 overflow-hidden text-ellipsis">
          <span>
            <span className="text-gray-400 text-sm w-48 inline-block">{dateStringToLocale(entryDate)}</span>
            <span className="md:text-lg font-medium overflow-hidden text-ellipsis mr-3 whitespace-nowrap">
              {title}
            </span>
          </span>
          <span className="hidden md:inline-block">
            <span className="w-48 inline-block">&nbsp;</span>
            {tags ? tags.map((tag) => <Tag simple tag={tag} key={tag.id} />) : null}
          </span>
        </div>
        {images.length > 0 ? <span className="text-gray-400 mr-1"><ImageIcon /></span> : null}
        {hasMood ? <span>{mood}</span> : null}
      </div>
    </Link>
  );
}
