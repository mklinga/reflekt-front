import React from 'react';
import MoodIndicator from './MoodIndicator/MoodIndicator';
import { JournalEntry } from '../../types/types';

type Props = {
    date: Date;
    readonly: boolean;
}

export default (props: Props) => {
    const journalEntry: JournalEntry = {
        mood: '🤩',
        title: 'First entry, best entry?',
        journal: 'This is the first, maybe the best, entry that this application will ever see.'
    }

    return <div>
        <h2>{props.date.toLocaleDateString()}</h2>
        <MoodIndicator readonly={props.readonly} journal={journalEntry} />
    </div>
}