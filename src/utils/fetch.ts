import { FetchStatus } from '../types/types';

export async function fetchJsonData<T>(url: string): Promise<[T | null, FetchStatus]> {
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

export async function putJsonData<T>(url: string, body: T): Promise<[T | null, FetchStatus]> {
  try {
    const response = await fetch(
      url,
      { method: 'PUT', body: JSON.stringify(body), headers: { 'Content-type': 'application/json' } },
    );
    if (response.status === 404) {
      return [null, 'NODATA'];
    }

    const data = await response.json();
    return [data, 'SUCCESS'];
  } catch (e) {
    return [null, 'ERROR'];
  }
}
