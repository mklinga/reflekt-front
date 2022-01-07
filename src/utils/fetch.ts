import { FetchStatus } from '../types/types';

export default async function fetchJsonData<T>(url: string): Promise<[T | null, FetchStatus]> {
  try {
    const response = await fetch(url);
    if (response.status === 404) {
      return [null, 'NODATA'];
    }

    const data = await response.json();
    return [data, 'SUCCESS'];
  } catch (e) {
    return [null, 'ERROR'];
  }
}
