export type JournalListItemType = {
    id: string;
    mood: string;
    title: string;
    entryDate: Date;
}

export type JournalListItemDto = JournalListItemType & {
    entryDate: string;
}

export type JournalEntryType = {
    id?: string;
    mood: string;
    title: string;
    entry: string;
    entryDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type JournalEntryDto = JournalEntryType & {
    createdAt: string;
    updatedAt: string;
    entryDate: string;
}

export type FetchStatus = 'NODATA' | 'ERROR' | 'SUCCESS';

export type LoadingStatus = 'loading' | 'resolved';

export type JournalEntryHook = {
  journalEntry: JournalEntryType | null;
  loadingStatus: LoadingStatus;
}
