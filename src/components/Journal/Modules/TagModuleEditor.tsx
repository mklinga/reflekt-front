import * as React from 'react';
import { TagModuleDto, JournalModuleDataType } from '../../../types/types';
import classes from '../../../utils/classes';
import Tag from '../../Common/Tag';

type Props = {
  data: TagModuleDto[];
  entryId: string;
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>;
}

function AvailableTags({ tags }: { tags: TagModuleDto[] }) {
  const className = classes([
    'hidden', 'peer-focus:block', 'shadow-2xl', 'shadow-[7px_7px_pink]',
    'border', 'border-dashed', 'border-black', 'bg-white', 'p-4',
  ]);

  return (
    <div className={className}>
      {tags.map((tag) => <Tag key={tag.id} tag={tag} />)}
    </div>
  );
}

export default function TagModuleEditor(props: Props) {
  const { data, entryId, updateModuleData } = props;
  const [allTags, setAllTags] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/tags/').then((response) => response.json()).then((allTagData: TagModuleDto[]) => {
      setAllTags(allTagData);
    });
  }, []);

  if (!entryId) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="relative w-full">
          <input
            className="w-full mr-6 peer"
            placeholder="No tags"
            type="text"
            defaultValue={data.map((tag) => tag.name).join(', ')}
          />
          <AvailableTags tags={allTags} />
        </div>
        <button type="button">Update</button>
      </div>
    </div>
  );
}
