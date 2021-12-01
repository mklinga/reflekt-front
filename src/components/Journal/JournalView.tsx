import * as React from 'react';
import { marked } from 'marked';
import { JournalEntry } from '../../types/types';
import MoodIndicator from './MoodIndicator';
import ChallengeList from './ChallengeList';
import Title from './Title';

type Props = {
    journal: JournalEntry;
    setData: React.Dispatch<React.SetStateAction<JournalEntry>>,
}

export default function (props: Props) {
    const journalDocument = marked.parse(props.journal.journal);

    return <div className="my-3">
        <h2 className="text-3xl my-6 flex">
            <MoodIndicator journal={props.journal} setData={props.setData} />
            <Title journal={props.journal} setData={props.setData} />
        </h2>
        <div className="journal-document" dangerouslySetInnerHTML={{ __html: journalDocument }}/>
        <div className="flex flex-column space-x-4">
            <div className="flex-grow border rounded my-2 p-2">
                <strong>Social</strong>
                <ChallengeList items={props.journal.social} />
            </div>
            <div className="flex-grow border rounded my-2 p-2">
                <strong>Physical</strong>
                <ChallengeList items={props.journal.physical} />
            </div>
        </div>
    </div>
}