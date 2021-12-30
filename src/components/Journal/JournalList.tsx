import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchAllJournalEntries } from '../../services/journal';
import { JournalEntry } from '../../types/types';
import JournalListItem from './JournalListItem';

export default function() {
    const [loaded, setLoaded ]= useState(false)
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(null);

    useEffect(() => {
        setLoaded(false);
        setJournalEntries(null);
        fetchAllJournalEntries(setJournalEntries)
            .then(() => setLoaded(true));
    }, []);

    if (!loaded) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {journalEntries.map(entry =>
                <JournalListItem key={entry.id} entry={entry} />)}
        </div>
    )
}