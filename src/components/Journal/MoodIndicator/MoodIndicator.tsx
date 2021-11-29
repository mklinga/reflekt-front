import * as React from 'react';
import { JournalEntry } from '../../../types/types';

type Props = {
    readonly: boolean;
    journal: JournalEntry;
}

export default (props: Props) => {
    if (props.readonly) {
        return <span className='text-3xl'>{props.journal.mood}</span>
    }

    return (
        <>
            <label htmlFor="mood">Mood:</label>
            <input type="text" name="mood" />
        </>
    );
}