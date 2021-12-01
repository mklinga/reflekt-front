import * as React from 'react';
import addDays from 'date-fns/esm/addDays';
import format from 'date-fns/esm/format';
import isToday from 'date-fns/esm/isToday';
import parseISO from 'date-fns/esm/parseISO';
import subDays from 'date-fns/esm/subDays';

import { Link } from 'react-router-dom';

type Props = {
    date: string;
}

export default (props: Props) => {
    const current = parseISO(props.date);
    const previous = subDays(current, 1);
    const next = isToday(current) ? null : addDays(current, 1);

    return (
        <div className="text-center">
            <Link className="text-xs pr-2" to={`/journal/${format(previous, 'yyyy-MM-dd')}`}>{previous.toLocaleDateString()}</Link>
            <span className="font-bold pr-2">{current.toLocaleDateString()}</span>
            {next ? <Link className="text-xs" to={`/journal/${format(next, 'yyyy-MM-dd')}`}>{next.toLocaleDateString()}</Link> : null }
        </div>
    );
}