import * as React from 'react';
import { JournalEntry } from '../../types/types';

type Props = {
    journal: JournalEntry;
    setData: React.Dispatch<React.SetStateAction<JournalEntry>>,
}

export default (props: Props) => {
    const [editing, setEditing] = React.useState(false);

    const doneEditing = (e: React.FocusEvent<HTMLInputElement>) => {
        props.setData({ ...props.journal, mood: e.target.value });
        setEditing(false);
    }

    if (editing) {
        return (
            <input
                autoFocus
                className="w-10 leading-10"
                type="text"
                defaultValue={props.journal.mood}
                onBlur={doneEditing} />
        );
    }

    return (
        <span className='text-3xl pr-3' onClick={() => setEditing(!editing)}>
            {props.journal.mood}
        </span>
    );
}