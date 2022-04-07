import * as React from 'react';
import { JournalModuleDataType, Modules } from '../../../types/types';
import ImageModuleEditor from '../Modules/ImageModuleEditor';
import TagModuleEditor from '../Modules/TagModuleEditor';

type Props = {
  moduleData: JournalModuleDataType;
  entryId: string;
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>;
}

export default function ModuleDataEditor(props: Props) {
  const { moduleData, updateModuleData, entryId } = props;
  const activeModules: Modules[] = ['images', 'tags'];

  function getModuleEditor(moduleName: string) {
    switch (moduleName) {
      case 'images':
        return (
          <ImageModuleEditor
            data={moduleData.images}
            entryId={entryId}
            updateModuleData={updateModuleData}
          />
        );

      case 'tags':
        return (
          <TagModuleEditor
            data={moduleData.tags}
            entryId={entryId}
            updateModuleData={updateModuleData}
          />
        );

      default:
        return null;
    }
  }

  return (
    <div>
      {activeModules.map((module: Modules) => (
        <div key={module}>
          {getModuleEditor(module)}
        </div>
      ))}
    </div>
  );
}
