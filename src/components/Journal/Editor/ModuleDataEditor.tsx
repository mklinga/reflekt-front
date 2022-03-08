import * as React from 'react';
import { JournalModuleDataType, Modules } from '../../../types/types';
import ImageModuleEditor from '../Modules/ImageModuleEditor';

type Props = {
  moduleData: JournalModuleDataType;
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>;
}

function getActiveModules(moduleData: JournalModuleDataType) {
  return Object.values(moduleData)
    .filter((value) => (Array.isArray(value) && value.length > 0))
    .map(([key, _]) => key);
}

function getModuleEditor(moduleName: Modules, moduleData: string[]) {
  switch (moduleName) {
    case 'images':
      return <ImageModuleEditor data={moduleData} />;
    default:
      return null;
  }
}

export default function ModuleDataEditor(props: Props) {
  const { moduleData, updateModuleData } = props;
  const activeModules = ['images']; // getActiveModules(moduleData);

  return (
    <div>
      {activeModules.map((module: Modules) => (
        <div key={module}>
          {getModuleEditor(module, moduleData[module])}
        </div>
      ))}
    </div>
  );
}
