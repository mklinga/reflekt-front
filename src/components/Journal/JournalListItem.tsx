import * as React from 'react';
import { JournalEntry } from '../../types/types';

type Props = {
    entry: JournalEntry;
}

export default (props: Props) => {
    const { entry: { mood, title, entryDate } } = props;
    return (
        <div className="flex p-3 items-center hover:bg-purple-100 cursor-pointer">
            <span className="text-2xl">{mood}</span>
            <span className="text-2xl flex-grow pl-3">{title}</span>
            <span className="text-gray-400 text-sm">{entryDate.toLocaleDateString()}</span>
        </div>
    )
}