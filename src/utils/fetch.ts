import { FetchStatus } from "../types/types";

export async function fetchJsonData<T> (url: string): Promise<[T | null, FetchStatus]> {
    try {
        const response = await fetch(url);
        if (response.status === 404) {
            return [null, 'NODATA'];
        }

        const data = await response.json();
        return [data, 'SUCCESS'];
    } catch (e) {
        console.error(`Error fetching ${url}`, e);
        return [null, 'ERROR'];
    }
}