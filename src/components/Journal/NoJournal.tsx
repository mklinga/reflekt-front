import * as React from 'react';
import { JournalEntry } from '../../types/types';

type Props = {
    date: string,
    setData: React.Dispatch<React.SetStateAction<JournalEntry>>,
}

const createNewJournalEntry = (setData: React.Dispatch<React.SetStateAction<JournalEntry>>) => () => {
    const emptyJournalEntry: JournalEntry = {
        mood: '🙂',
        title: '',
        journal: '',
        social: [],
        physical: []
    }

    return setData(emptyJournalEntry);
}

export default function(props: Props) {
    return <div>
        <h3>No journal yet for {props.date}</h3>
        <button onClick={createNewJournalEntry(props.setData)}>Create one now</button>
    </div>
}