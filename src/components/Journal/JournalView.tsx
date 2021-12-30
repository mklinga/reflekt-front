import * as React from 'react';
import { JournalEntry } from '../../types/types';
import MoodIndicator from './MoodIndicator';
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
    </div>
}