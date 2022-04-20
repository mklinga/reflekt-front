import * as React from 'react';
import { TagModuleDto, JournalModuleDataType } from '../../../types/types';
import classes from '../../../utils/classes';
import Tag from '../../Common/Tag';
import TagSelector from './TagSelector';

type Props = {
  data: TagModuleDto[];
  entryId: string;
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
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
  const {
    data, entryId, updateModuleData, setIsDirty,
  } = props;
  const [tagSelectorVisible, setTagSelectorVisible] = React.useState(false);

  const hasTags = Array.isArray(data) && data.length > 0;
  const tagLine = hasTags ? data.map((tag) => <Tag key={tag.id} tag={tag} />) : 'No tags';
  const tagLineClass = classes(['w-full', 'mr-6', 'text-sm', 'text-left', hasTags ? null : 'text-gray-400']);

  if (!entryId) {
    return null;
  }
  const toggleTagSelector = () => setTagSelectorVisible(!tagSelectorVisible);

  return (
    <div>
      <div className="flex justify-between items-center my-3">
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
            visible={tagSelectorVisible}
            setIsDirty={setIsDirty}
            toggleTagFn={toggleTag(updateModuleData)}
          />
        </div>
      </div>
    </div>
  );
}
