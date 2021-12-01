import * as React from 'react';
import { JournalEntry } from '../../types/types';

type Props = {
    journal: JournalEntry;
    setData: React.Dispatch<React.SetStateAction<JournalEntry>>,
}

export default (props: Props) => {
    const [editing, setEditing] = React.useState(false);

    const doneEditing = (e: React.FocusEvent<HTMLInputElement>) => {
        props.setData({ ...props.journal, title: e.target.value });
        setEditing(false);
    }

    if (editing) {
        return (
            <input
                className="flex-grow"
                autoFocus
                type="text"
                defaultValue={props.journal.title}
                onBlur={doneEditing} />
        );
    }

    return (
        <span className='text-3xl pr-3' onClick={() => setEditing(!editing)}>
            {props.journal.title}
        </span>
    );
}