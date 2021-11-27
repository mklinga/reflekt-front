import * as React from 'react';
import { JournalEntry } from '../../../types/types';

import './MoodIndicator.css';

type Props = {
    readonly: boolean;
    journal: JournalEntry;
}

export default (props: Props) => {
    if (props.readonly) {
        return <span className='MoodIndicator'>{props.journal.mood}</span>
    }

    return <span>MOOD</span>
}