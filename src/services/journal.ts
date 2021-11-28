import { JournalEntry, JournalFetchStatus } from "../types/types";

export const loadJournalEntry: (date: string) => Promise<[JournalEntry | null, JournalFetchStatus]> = async date => {
    try {
        const response = await fetch(`/api/journal/${date}`);
        if (response.status === 404) {
            return [null, 'NODATA'];
        }

        return [await response.json(), 'SUCCESS'];
    } catch (e) {
        console.error(`Error fetching the journal for ${date}`, e);
        return [null, 'ERROR'];
    }
}