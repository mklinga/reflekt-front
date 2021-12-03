import * as React from 'react';
import { JournalEntry } from '../../types/types';
import MoodIndicator from './MoodIndicator';
import ChallengeList from './ChallengeList';
import Title from './Title';
import JournalDescription from './JournalDescription';

type Props = {
    journal: JournalEntry;
    setData: React.Dispatch<React.SetStateAction<JournalEntry>>,
}

export default function (props: Props) {
    return <div className="my-3">
        <h2 className="text-3xl my-6 flex">
            <MoodIndicator journal={props.journal} setData={props.setData} />
            <Title journal={props.journal} setData={props.setData} />
        </h2>
        <JournalDescription journal={props.journal} setData={props.setData} />
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