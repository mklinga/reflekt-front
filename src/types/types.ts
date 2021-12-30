export type JournalEntry = {
    id?: string;
    mood: string;
    title: string;
    entry: string;
    entryDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type JournalEntryDto = JournalEntry & {
    createdAt: string;
    updatedAt: string;
    entryDate: string;
}

export type FetchStatus = 'NODATA' | 'ERROR' | 'SUCCESS';