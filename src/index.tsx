import * as React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import fetchSystemInformation from './services/system';
import App from './components/App/App';
import JournalList from './components/Journal/JournalList';
import JournalEntry from './components/Journal/JournalEntry';

const mainElement = document.querySelector('body > main');
mainElement.innerHTML = 'Loading...';

fetchSystemInformation().then((information) => {
  // TODO: could be a react element as well
  const informationSpan = document.createElement('span');
  informationSpan.innerHTML = information.hello;
  document.querySelector('body footer').append(informationSpan);

  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="journal" element={<JournalList />} />
          <Route path="journal/:id" element={<JournalEntry />} />
        </Route>
        <Route path="*" element={<span>404, that&apos;s all.</span>} />
      </Routes>
    </BrowserRouter>,
    document.querySelector('main'),
  );
});
