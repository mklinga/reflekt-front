import { JournalEntry, JournalFetchStatus } from "../types/types";

type JournalEntryLoader = (date: string) => Promise<[JournalEntry | null, JournalFetchStatus]>;

const loadJournalEntry: JournalEntryLoader = async date => {
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

export const fetchData = async (
    date: string,
    setData: React.Dispatch<React.SetStateAction<JournalEntry>>,
    setReadonly: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
    const [data, status] = await loadJournalEntry(date);
    switch (status) {
        case 'SUCCESS':
            setReadonly(true);
            setData(data);
            return;
        case 'NODATA':
            setReadonly(false);
            setData({ mood: '', title: '', journal: '' })
            break;
        case 'ERROR':
            // TODO
        default:
            return;
    }
}

export const getTodayISO = () => (new Date()).toISOString().substr(0, 10);
