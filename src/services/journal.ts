import { JournalEntry, JournalEntryDto } from "../types/types";
import { fetchJsonData } from '../utils/fetch';

/* We convert all the dates from string -> Date objects when loading from the backend */
function dtoConverter (data: JournalEntryDto[]): JournalEntry[] {
    return data.map(d => ({
        ...d,
        createdAt: new Date(Date.parse(d.createdAt)),
        updatedAt: new Date(Date.parse(d.updatedAt)),
        entryDate: new Date(Date.parse(d.entryDate))
    }));
}

export const fetchAllJournalEntries = async (setData: React.Dispatch<React.SetStateAction<JournalEntry[]>>) => {
    const [data, status] = await fetchJsonData<JournalEntryDto[]>('/api/journal');
    switch (status) {
        case 'SUCCESS':
            setData(dtoConverter(data));
            break;
        default:
            console.error('Failed');
            return;
    }
}
