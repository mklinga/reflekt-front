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
        <div className="DateBar">
            <Link to={`/journal/${format(previous, 'yyyy-MM-dd')}`}>Yesterday</Link>
            <strong>{current.toLocaleDateString()}</strong>
            {next ? <Link to={`/journal/${format(next, 'yyyy-MM-dd')}`}>Tomorrow</Link> : null }
        </div>
    );
}