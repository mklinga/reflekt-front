import * as React from 'react';
import { marked } from 'marked';
import { JournalEntry } from '../../../types/types';
import MoodIndicator from '../MoodIndicator/MoodIndicator';

type Props = {
    journal: JournalEntry;
}

export default function (props: Props) {
    const journalDocument = marked.parse(props.journal.journal);

    return <div className="my-3">
        <h2 className="text-3xl my-6">
            <MoodIndicator readonly journal={props.journal} />
            {props.journal.title}
        </h2>
        <div className="journal-document" dangerouslySetInnerHTML={{ __html: journalDocument }}/>
    </div>
}