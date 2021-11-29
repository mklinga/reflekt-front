import * as React from 'react';
import { Outlet } from 'react-router';

export default () => {
    const date = new Date();
    return <div>
        <header>
            <h1 className="text-xl font-medium text-black border-b border-black py-6">Reflekt</h1>
        </header>
        <Outlet />
    </div>
}