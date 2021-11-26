import React from 'react';
import Journal from '../Journal/Journal';

export default () => {
    const date = new Date();
    return <div>
        <header>
            <h1>Reflekt</h1>
        </header>
        <Journal date={date} readonly={true} />
    </div>
}