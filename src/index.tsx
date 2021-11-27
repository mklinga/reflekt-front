import { fetchSystemInformation } from './services/system';
import * as React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import App from './components/App/App';
import Journal from './components/Journal/Journal';

import './index.css';

const mainElement = document.querySelector('body > main');
mainElement.innerHTML = 'Loading...';

fetchSystemInformation().then(information => {
    // TODO: could be a react element as well
    const informationSpan = document.createElement('span');
    informationSpan.innerHTML = information.hello;
    document.querySelector('body footer').append(informationSpan);

    render(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route path="journal/:date" element={<Journal />}></Route>
                </Route>
                <Route path="*" element={<span>404, that's all.</span>} />
            </Routes>
        </BrowserRouter>
    , document.querySelector('main'));
});