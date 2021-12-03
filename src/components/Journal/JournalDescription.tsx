import * as React from 'react';
import { marked } from 'marked';
import { JournalEntry } from '../../types/types';

type Props = {
    journal: JournalEntry;
    setData: React.Dispatch<React.SetStateAction<JournalEntry>>,
}

export default (props: Props) => {
    const [editing, setEditing] = React.useState(false);

    const doneEditing = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        props.setData({ ...props.journal, journal: e.target.value });
        setEditing(false);
    }

    if (editing) {
        return (
            <textarea
                className="w-full h-40"
                autoFocus
                defaultValue={props.journal.journal}
                onBlur={doneEditing} />
        );
    }

    const journalDocument = marked.parse(props.journal.journal || '...');

    return (
        <div
            className="journal-document"
            onClick={() => setEditing(!editing)}
            dangerouslySetInnerHTML={{ __html: journalDocument }}
        />
    );
}