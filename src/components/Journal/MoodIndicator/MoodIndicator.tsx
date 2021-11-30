import * as React from 'react';
import { JournalEntry } from '../../../types/types';

type Props = {
    journal: JournalEntry;
}

export default (props: Props) => {
    return (
        <span className='text-3xl pr-3'>
            {props.journal.mood}
        </span>
    );
}