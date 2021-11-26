import { fetchSystemInformation } from './services/system';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';

import './index.css';

const mainElement = document.querySelector('body > main');
mainElement.innerHTML = 'Loading...';

fetchSystemInformation().then(information => {
    // TODO: could be a react element as well
    const informationSpan = document.createElement('span');
    informationSpan.innerHTML = information.hello;
    document.querySelector('body footer').append(informationSpan);

    render(<App />, document.querySelector('main'));
});