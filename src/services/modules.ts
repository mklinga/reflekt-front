import { JournalModuleDataType } from '../types/types';
import { fetchJsonData, postJsonData } from '../utils/fetch';

/* eslint-disable import/prefer-default-export */
export async function fetchModuleData(
  id: string,
  setData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>,
) {
  const fetchUrl = `/api/modules/${id}`;
  const [data, status] = await fetchJsonData<JournalModuleDataType>(fetchUrl);
  switch (status) {
    case 'SUCCESS':
      setData(data);
      break;
    default:
    // TODO: do something about the error
  }
}

export async function saveModuleData(entryId: string, moduleData: JournalModuleDataType) {
  const postUrl = `/api/modules/${entryId}`;
  return postJsonData<unknown>(postUrl, moduleData);
}
