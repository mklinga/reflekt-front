import * as React from 'react';
import { Challenge } from '../../types/types';

type Props = {
    items: Challenge[];
}

const onCheckboxChange = () => {}

export default function(props: Props) {
    return <div>
        {props.items.map(item => (
            <span className="block" key={item.description}>
                <label>
                    <input type="checkbox" className="mr-1" defaultChecked={item.completed} onChange={onCheckboxChange} />
                    {item.description}
                </label>
            </span>
        ))}
    </div>;
}