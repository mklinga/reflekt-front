export type Challenge = {
    description: string;
    completed: boolean;
}

export type JournalEntry = {
    mood: string;
    title: string;
    journal: string;
    social: Challenge[];
    physical: Challenge[];
}

export type ChallengeEntry = {
    completed: boolean;
    description: string;
}

export type JournalFetchStatus = 'NODATA' | 'ERROR' | 'SUCCESS';