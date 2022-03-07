import * as React from 'react';
import { fetchModuleData } from '../services/modules';
import { JournalModuleDataType, JournalModulesHook } from '../types/types';

export default function useJournalModules(id: string): JournalModulesHook {
  const [loaded, setLoaded] = React.useState(false);
  const [moduleData, setModuleData] = React.useState<JournalModuleDataType>(null);

  React.useEffect(() => {
    setLoaded(false);
    setModuleData(null);
    fetchModuleData(id, setModuleData).then(() => setLoaded(true));
  }, []);

  return {
    moduleData,
    loadingStatus: loaded ? 'resolved' : 'loading',
  };
}
