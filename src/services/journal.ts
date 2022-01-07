import { JournalEntry, JournalEntryDto } from "../types/types";
import { fetchJsonData } from '../utils/fetch';
import { parseStringToDate } from '../utils/date';

/* We convert all the dates from string -> Date objects when loading from the backend */
function dtoConverter (dtoData: JournalEntryDto[]): JournalEntry[] {
    return dtoData.map(journalEntry => ({
        ...journalEntry,
        createdAt: parseStringToDate(journalEntry.createdAt),
        updatedAt: parseStringToDate(journalEntry.updatedAt),
        entryDate: parseStringToDate(journalEntry.entryDate)
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
