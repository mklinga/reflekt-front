import { JournalEntry } from "../types/types";

export const loadJournalEntry: (date: Date) => Promise<JournalEntry> = async date => {
    const dateString = date.toISOString().substr(0, 10);
    try {
        const data: JournalEntry = await fetch(`/api/journal/${dateString}`).then(x => x.json());
        return data;
    } catch (e) {
        console.error(`Error fetching the journal for ${dateString}`, e);
        return { mood: '', title: '', journal: '' };
    }
}