import * as React from 'react';
import { JournalEntryType, TagType } from '../../../types/journalTypes';
import classes from '../../../utils/classes';
import Tag from '../../Common/Tag';
import TagSelector from './TagSelector';

type Props = {
  data: TagType[];
  entryId: string;
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>;
}

function toggleTag(
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>,
) {
  return function toggle(tag: TagType) {
    updateEntry((data: JournalEntryType) => {
      const existingTags = data.tags || [];
      const hasTag = existingTags.find((existingTag) => existingTag.id === tag.id);
      return {
        ...data,
        tags: hasTag ? existingTags.filter((x) => x.id !== tag.id) : existingTags.concat(tag),
      };
    });
  };
}

export default function TagEditor(props: Props) {
  const {
    data, entryId, updateEntry,
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
            toggleTagFn={toggleTag(updateEntry)}
          />
        </div>
      </div>
    </div>
  );
}
