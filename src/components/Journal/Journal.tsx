import React, { useEffect, useState } from 'react';
import MoodIndicator from './MoodIndicator/MoodIndicator';
import { JournalEntry } from '../../types/types';
import { loadJournalEntry } from '../../services/journal';

type Props = {
    date: Date;
    readonly: boolean;
}

export default (props: Props) => {
    const [journalEntry, setJournalEntry] = useState<JournalEntry>(null);
    useEffect(() => {
        const fetchData = async () => {
            console.log('fetching data')
            const data = await loadJournalEntry(props.date);
            setJournalEntry(data);
        }

        fetchData();
    }, []);

    if (!journalEntry) {
        return <span>Loading...</span>
    }

    return <div>
        <h2>{props.date.toLocaleDateString()}</h2>
        <MoodIndicator readonly={props.readonly} journal={journalEntry} />
    </div>
}