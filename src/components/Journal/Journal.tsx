import * as React from 'react';
import { useEffect, useState } from 'react';
import MoodIndicator from './MoodIndicator/MoodIndicator';
import { JournalEntry } from '../../types/types';
import { loadJournalEntry } from '../../services/journal';
import { useParams } from 'react-router-dom';
import DateBar from './DateBar/DateBar';

const fetchData = async (
    date: string,
    setData: React.Dispatch<React.SetStateAction<JournalEntry>>,
    setReadonly: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const [data, status] = await loadJournalEntry(date);
    console.log('status', status);
    switch (status) {
        case 'SUCCESS':
            setReadonly(true);
            setData(data);
            return;
        case 'NODATA':
            setReadonly(false);
            setData({ mood: '', title: '', journal: '' })
            break;
        case 'ERROR':
        default:
            return;
    }
}

const getTodayISO = () => (new Date()).toISOString().substr(0, 10);

export default () => {
    // const [date, setDate] = useState(useParams().date || getTodayISO());
    const date = useParams().date || getTodayISO();
    const [journalEntry, setJournalEntry] = useState<JournalEntry>(null);
    const [readonly, setReadonly] = useState(true);

    useEffect(() => {
        fetchData(date, setJournalEntry, setReadonly);
    }, [date]);

    if (!journalEntry) {
        return <span>Loading...</span>
    }

    return <div>
        <span>{readonly ? 'Edit' : 'Save'}</span>
        <DateBar date={date}  />
        <MoodIndicator readonly={readonly} journal={journalEntry} />
    </div>
}