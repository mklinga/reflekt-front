import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '../../icons/EditIcon';
import ImageIcon from '../../icons/ImageIcon';
import { JournalEntryType, TagType } from '../../types/journalTypes';
import { dateStringToLocale } from '../../utils/date';
import Tag from '../Common/Tag';

type Props = {
  entry: JournalEntryType;
}

export default function JournalListItem(props: Props) {
  const navigate = useNavigate();
  const {
    entry: {
      id, title, entryDate, mood, images, tags,
    },
  } = props;
  const linkUrl = `/journal/${id}`;
  const hasMood = mood && (mood !== '😶');

  const searchTag = (tag: TagType) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/search?tag=${tag.name}`);
  };

  const editButtonClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the underlying Link element from catching the event
    navigate(`/journal/${id}/edit`);
  }, [id]);

  return (
    <Link to={linkUrl}>
      <div className="group flex p-1 items-center hover:bg-gray-100 border border-transparent hover:border-slate-200 cursor-pointer">
        <div className="flex-grow flex flex-col pl-3 overflow-hidden text-ellipsis">
          <span>
            <span className="text-gray-400 text-sm w-48 inline-block">{dateStringToLocale(entryDate)}</span>
            <span className="inline-flex">
              <span className="md:text-lg font-medium overflow-hidden text-ellipsis mr-3 whitespace-nowrap">
                {title}
              </span>
              <button
                type="button"
                onClick={editButtonClick}
                className="invisible group-hover:visible inline-flex items-center text-gray-600"
              >
                <EditIcon />
              </button>
            </span>
          </span>
          <span className="hidden md:inline-block">
            <span className="w-48 inline-block">&nbsp;</span>
            {tags
              ? tags.map((tag) => <Tag onClick={searchTag(tag)} simple tag={tag} key={tag.id} />)
              : null}
          </span>
        </div>
        {images.length > 0 ? <span className="text-gray-400 mr-1"><ImageIcon /></span> : null}
        {hasMood ? <span>{mood}</span> : null}
      </div>
    </Link>
  );
}
