import * as React from 'react';
import { ImageModuleDto, JournalModuleDataType, Modules } from '../../../types/types';
import ImageModuleEditor from '../Modules/ImageModuleEditor';

type Props = {
  moduleData: JournalModuleDataType;
  entryId: string;
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>;
}

function getModuleEditor(moduleName: Modules, moduleData: ImageModuleDto[], entryId: string) {
  switch (moduleName) {
    case 'images':
      return <ImageModuleEditor data={moduleData} entryId={entryId} />;
    default:
      return null;
  }
}

export default function ModuleDataEditor(props: Props) {
  const { moduleData, updateModuleData, entryId } = props;
  const activeModules: Modules[] = ['images'];

  return (
    <div>
      {activeModules.map((module: Modules) => (
        <div key={module}>
          {getModuleEditor(module, moduleData[module], entryId)}
        </div>
      ))}
    </div>
  );
}
