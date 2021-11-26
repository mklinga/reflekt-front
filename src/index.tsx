import { fetchSystemInformation } from './services/system';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App/App';

const mainElement = document.querySelector('body > main');
mainElement.innerHTML = 'So this is the reflekt.';

fetchSystemInformation().then(information => {
    const informationSpan = document.createElement('span');
    informationSpan.innerHTML = information.hello;
    document.querySelector('body footer').append(informationSpan);

    render(<App />, document.querySelector('main'));
});