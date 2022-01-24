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
import JournalEntryEditor from './components/Journal/JournalEntryEditor';
import UnauthorisedException from './utils/exceptions/UnauthorisedException';
import Login from './components/App/Login';
import Dashboard from './components/App/Dashboard';

const mainElement = document.querySelector('body > main');
mainElement.innerHTML = 'Loading...';

async function load() {
  try {
    const loginInformation = await fetchSystemInformation();
    // TODO: could be a react element as well
    const informationSpan = document.createElement('span');
    informationSpan.innerHTML = loginInformation.hello;
    document.querySelector('body footer').append(informationSpan);

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Dashboard />} />
            <Route path="journal" element={<JournalList />} />
            <Route path="journal/:id" element={<JournalEntry />} />
            <Route path="journal/:id/edit" element={<JournalEntryEditor />} />
          </Route>
          <Route path="*" element={<span>404, that&apos;s all.</span>} />
        </Routes>
      </BrowserRouter>,
      document.querySelector('main'),
    );
  } catch (e) {
    if (e instanceof UnauthorisedException) {
      render(<Login />, document.querySelector('main'));
    } else {
      document.querySelector('main').innerText = 'Hmm.';
    }
  }
}

load();
