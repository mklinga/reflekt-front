import * as React from 'react';
import { TagModuleDto } from '../../../types/types';
import classes from '../../../utils/classes';
import Tag from '../../Common/Tag';
import TagEditorInline from './TagEditorInline';

type TagSelectorProps = {
  visible: boolean,
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>
  toggleTagFn: (tag: TagModuleDto) => void,
}

export default function TagSelector({
  visible, setIsDirty, toggleTagFn,
}: TagSelectorProps) {
  const [allTags, setAllTags] = React.useState([]);
  const [tagEditorVisible, setTagEditorVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    fetch('/api/tags/').then((response) => response.json()).then((allTagData: TagModuleDto[]) => {
      setAllTags(allTagData);
    });
  }, []);

  const addNewTag = () => setTagEditorVisible(!tagEditorVisible);

  const className = classes([
    'absolute', 'w-full', visible ? 'visible' : 'hidden', 'border', 'border-dashed', 'border-black', 'bg-white', 'p-4',
  ]);

  const handleClick = (tag: TagModuleDto) => (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsDirty(true);
    toggleTagFn(tag);
    e.preventDefault();
  };

  return (
    <div className={className}>
      {tagEditorVisible
        ? <TagEditorInline setTags={setAllTags} />
        : allTags.map((tag) => <Tag key={tag.id} tag={tag} onClick={handleClick(tag)} />)}
      <button type="button" className="text-blue-600 underline float-right" onClick={addNewTag}>
        {tagEditorVisible ? 'Close' : 'Add new tag'}
      </button>
    </div>
  );
}
