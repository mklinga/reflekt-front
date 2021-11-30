import * as React from 'react';
import { useEffect, useState } from 'react';
import { JournalEntry } from '../../types/types';
import { fetchData, getTodayISO } from '../../services/journal';
import { useParams } from 'react-router-dom';
import DateBar from './DateBar/DateBar';
import JournalView from './JournalView/JournalView';

export default () => {
    const date = useParams().date || getTodayISO();
    const [journalEntry, setJournalEntry] = useState<JournalEntry>(null);
    const [readonly, setReadonly] = useState(true);

    useEffect(() => {
        fetchData(date, setJournalEntry, setReadonly);
    }, [date]);

    if (!journalEntry) {
        return <span>Loading...</span>
    }

    return <div className="py-2">
        <DateBar date={date}  />
        {readonly ? <JournalView journal={journalEntry} /> : null}
    </div>
}