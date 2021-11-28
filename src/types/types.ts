export type JournalEntry = {
    mood: string;
    title: string;
    journal: string;
}

export type ChallengeEntry = {
    completed: boolean;
    description: string;
}

export type JournalFetchStatus = 'NODATA' | 'ERROR' | 'SUCCESS';