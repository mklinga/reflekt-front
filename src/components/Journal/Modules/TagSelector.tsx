import * as React from 'react';
import { TagModuleDto } from '../../../types/types';
import classes from '../../../utils/classes';
import { sortByColorAndName } from '../../../utils/tags';
import Tag from '../../Common/Tag';
import TagEditorInline from './TagEditorInline';

type TagSelectorProps = {
  visible: boolean,
  toggleTagFn: (tag: TagModuleDto) => void,
}

export default function TagSelector({
  visible, toggleTagFn,
}: TagSelectorProps) {
  const [allTags, setAllTags] = React.useState([]);
  const [tagEditorVisible, setTagEditorVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetch('/api/tags/').then((response) => response.json()).then((allTagData: TagModuleDto[]) => {
      setAllTags(sortByColorAndName(allTagData));
    });
  }, []);

  const toggleEditor = () => setTagEditorVisible(!tagEditorVisible);

  const className = classes([
    'absolute', 'w-full', visible ? 'visible' : 'hidden', 'border', 'border-dashed', 'border-black',
    'bg-white', 'p-4', 'z-10',
  ]);

  const handleClick = (tag: TagModuleDto) => (e: React.MouseEvent<HTMLButtonElement>) => {
    toggleTagFn(tag);
    e.preventDefault();
  };

  return (
    <div className={className}>
      {tagEditorVisible
        ? <TagEditorInline setTags={setAllTags} toggleEditor={toggleEditor} />
        : (
          <div>
            {allTags.map((tag) => (
              <span key={tag.id} className="my-1 inline-block">
                <Tag tag={tag} onClick={handleClick(tag)} />
              </span>
            ))}
          </div>
        )}
      <div>
        <button type="button" className="text-blue-600 underline float-right" onClick={toggleEditor}>
          {tagEditorVisible ? 'Close' : 'Add new tag'}
        </button>
      </div>
    </div>
  );
}
