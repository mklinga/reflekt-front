export type JournalEntry = {
    id?: string;
    mood: string;
    title: string;
    entry: string;
}

export type JournalFetchStatus = 'NODATA' | 'ERROR' | 'SUCCESS';