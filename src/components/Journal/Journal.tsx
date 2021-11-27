import * as React from 'react';
import { useEffect, useState } from 'react';
import MoodIndicator from './MoodIndicator/MoodIndicator';
import { JournalEntry } from '../../types/types';
import { loadJournalEntry } from '../../services/journal';
import { useParams } from 'react-router-dom';

const fetchData = async (date: string, setData: React.Dispatch<React.SetStateAction<JournalEntry>>) => {
    const data = await loadJournalEntry(date);
    setData(data);
}

const getTodayISO = () => (new Date()).toISOString().substr(0, 10);

export default () => {
    const date = useParams().date || getTodayISO();
    
    const [journalEntry, setJournalEntry] = useState<JournalEntry>(null);
    const [readonly, setReadonly] = useState(true);

    useEffect(() => {
        console.log('effect for', date);
        fetchData(date, setJournalEntry);
    }, [date]);

    if (!journalEntry) {
        return <span>Loading...</span>
    }

    return <div>
        <h2>{date}</h2>
        <MoodIndicator readonly={readonly} journal={journalEntry} />
    </div>
}