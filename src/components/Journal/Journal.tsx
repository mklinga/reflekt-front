import * as React from 'react';
import { useEffect, useState } from 'react';
import { JournalEntry } from '../../types/types';
import { fetchData, getTodayISO } from '../../services/journal';
import { useParams } from 'react-router-dom';
import DateBar from './DateBar';
import JournalView from './JournalView';
import NoJournal from './NoJournal';

export default () => {
    const date = useParams().date || getTodayISO();
    const [loaded, setLoaded ]= useState(false)
    const [journalEntry, setJournalEntry] = useState<JournalEntry>(null);

    useEffect(() => {
        (async () => {
            setLoaded(false);
            setJournalEntry(null);
            await fetchData(date, setJournalEntry);
            setLoaded(true);
        })();
    }, [date]);

    if (!loaded) {
        return <span>Loading...</span>;
    }

    return <div className="py-2">
        <DateBar date={date}  />
        {journalEntry ? <JournalView journal={journalEntry} setData={setJournalEntry} /> : <NoJournal setData={setJournalEntry} date={date} />}
    </div>
}