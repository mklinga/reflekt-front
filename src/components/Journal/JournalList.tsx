import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchAllJournalEntries } from '../../services/journal';
import { JournalEntry } from '../../types/types';

export default function() {
    const [loaded, setLoaded ]= useState(false)
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(null);

    useEffect(() => {
        (async () => {
            setLoaded(false);
            setJournalEntries(null);
            await fetchAllJournalEntries(setJournalEntries);
            setLoaded(true);
        })();
    }, []);

    if (!loaded) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {journalEntries.map(entry => (
                <div key={entry.id}>{entry.mood} {entry.title}</div>
            ))}
            
        </div>
    )
}