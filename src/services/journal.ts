import { JournalEntry } from "../types/types";

export const loadJournalEntry: (date: string) => Promise<JournalEntry> = async date => {
    try {
        const data: JournalEntry = await fetch(`/api/journal/${date}`).then(x => x.json());
        return data;
    } catch (e) {
        console.error(`Error fetching the journal for ${date}`, e);
        return { mood: '', title: '', journal: '' };
    }
}