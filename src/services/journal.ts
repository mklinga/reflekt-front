import { JournalEntry, JournalEntryDto, JournalListItemDto, JournalListItemType } from "../types/types";
import { fetchJsonData } from '../utils/fetch';
import { parseStringToDate } from '../utils/date';

/* We convert all the dates from string -> Date objects when loading from the backend */
function journalEntryDtoConverter (journalEntry: JournalEntryDto): JournalEntry {
    return {
        ...journalEntry,
        createdAt: parseStringToDate(journalEntry.createdAt),
        updatedAt: parseStringToDate(journalEntry.updatedAt),
        entryDate: parseStringToDate(journalEntry.entryDate)
    };
}

function journalListItemDtoConverter (dtoData: JournalListItemDto[]): JournalListItemType[] {
    return dtoData.map(journalListItem => ({
        ...journalListItem,
        entryDate: parseStringToDate(journalListItem.entryDate)
    }))
}

export async function fetchJournalEntry (id: string, setData: Function) {
    const fetchUrl = `/api/journal/${id}`;
    const [data, status] = await fetchJsonData<JournalEntryDto>(fetchUrl);
    switch (status) {
        case 'SUCCESS':
            setData(journalEntryDtoConverter(data));
            break;
        default:
            console.error('Failed');
            return;
    }
}

export const fetchAllJournalEntries = async (setData: React.Dispatch<React.SetStateAction<JournalListItemType[]>>) => {
    const [data, status] = await fetchJsonData<JournalListItemDto[]>('/api/journal');
    switch (status) {
        case 'SUCCESS':
            setData(journalListItemDtoConverter(data));
            break;
        default:
            console.error('Failed');
            return;
    }
}
