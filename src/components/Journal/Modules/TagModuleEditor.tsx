import * as React from 'react';
import { TagModuleDto, JournalModuleDataType } from '../../../types/types';
import classes from '../../../utils/classes';
import Tag from '../../Common/Tag';

type Props = {
  data: TagModuleDto[];
  entryId: string;
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>;
}

type TagSelectorProps = {
  tags: TagModuleDto[],
  visible: boolean,
  setDirty: React.Dispatch<React.SetStateAction<boolean>>
  toggleTagFn: (tag: TagModuleDto) => void,
}

function TagSelector({
  tags, visible, setDirty, toggleTagFn,
}: TagSelectorProps) {
  const className = classes([
    'absolute', 'w-full', visible ? 'visible' : 'hidden', 'border', 'border-dashed', 'border-black', 'bg-white', 'p-4',
  ]);

  const handleClick = (tag: TagModuleDto) => (e: React.MouseEvent<HTMLButtonElement>) => {
    setDirty(true);
    toggleTagFn(tag);
    e.preventDefault();
  };

  return (
    <div className={className}>
      {tags.map((tag) => <Tag key={tag.id} tag={tag} onClick={handleClick(tag)} />)}
    </div>
  );
}

function toggleTag(
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>,
) {
  return function toggle(tag: TagModuleDto) {
    updateModuleData((data: JournalModuleDataType) => {
      const hasTag = data.tags.find((existingTag) => existingTag.id === tag.id);
      return {
        ...data,
        tags: hasTag ? data.tags.filter((x) => x.id !== tag.id) : data.tags.concat(tag),
      };
    });
  };
}

export default function TagModuleEditor(props: Props) {
  const { data, entryId, updateModuleData } = props;
  const [allTags, setAllTags] = React.useState([]);
  const [tagSelectorVisible, setTagSelectorVisible] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);

  const hasTags = Array.isArray(data) && data.length > 0;
  const tagLine = hasTags ? data.map((tag) => <Tag key={tag.id} tag={tag} />) : 'No tags';
  const tagLineClass = classes(['w-full', 'mr-6', 'text-sm', 'text-left', hasTags ? null : 'text-gray-400']);

  React.useEffect(() => {
    fetch('/api/tags/').then((response) => response.json()).then((allTagData: TagModuleDto[]) => {
      setAllTags(allTagData);
    });
  }, []);

  if (!entryId) {
    return null;
  }
  const toggleTagSelector = () => setTagSelectorVisible(!tagSelectorVisible);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="relative w-full">
          <div
            role="button"
            onKeyPress={toggleTagSelector}
            tabIndex={0}
            className={tagLineClass}
            onClick={toggleTagSelector}
          >
            {tagLine}
          </div>
          <TagSelector
            tags={allTags}
            visible={tagSelectorVisible}
            setDirty={setDirty}
            toggleTagFn={toggleTag(updateModuleData)}
          />
        </div>
        <button type="button" className={dirty ? 'text-pink-500' : ''}>Update</button>
      </div>
    </div>
  );
}
