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

export async function sendBody<T>(url: string, body: T, method = 'POST'): Promise<[T | null, FetchStatus]> {
  try {
    const response = await fetch(
      url,
      { method, body: JSON.stringify(body), headers: { 'Content-type': 'application/json' } },
    );
    if (response.status === 404) {
      return [null, 'NODATA'];
    }

    if (response.status >= 200 && response.status <= 299) {
      const data = await response.json();
      return [data, 'SUCCESS'];
    }

    throw new Error('Bad status code');
  } catch (e) {
    return [null, 'ERROR'];
  }
}

export async function putJsonData<T>(url: string, body: T): Promise<[T | null, FetchStatus]> {
  return sendBody(url, body, 'PUT');
}

export async function postJsonData<T>(url: string, body: T): Promise<[T | null, FetchStatus]> {
  return sendBody(url, body, 'POST');
}
