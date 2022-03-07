import { JournalModuleDataType } from '../types/types';
import { fetchJsonData } from '../utils/fetch';

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
