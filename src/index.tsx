import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { store } from './store/index';
import App from './components/App/App';
import JournalList from './components/Journal/JournalList';
import JournalEntry from './components/Journal/JournalEntry';
import JournalEntryEditor from './components/Journal/JournalEntryEditor';
import UnauthorisedException from './utils/exceptions/UnauthorisedException';
import Login from './components/App/Login';
import Dashboard from './components/App/Dashboard';
import JournalEntryCreator from './components/Journal/JournalEntryCreator';
import SearchPage from './components/Search/SearchPage';
import { setLoginStatus } from './store/user/userSlice';
import Contacts from './components/Contacts/Contacts';
import ContactCreator from './components/Contacts/ContactCreator';
import { fetchLoginStatus } from './services/login';
import ContactViewer from './components/Contacts/ContactViewer';
import { fetchContacts } from './services/contact';
import { setContacts, setContactsLoaded } from './store/contacts/contactSlice';

const mainElement = document.querySelector('body > main');
mainElement.innerHTML = 'Loading...';

async function loadInitialData() {
  /*
    We load the user contact data even before the application loads, because it's so widely used
    throughout the application that the constant check/load if needed gets quite bothersome.
    If this ever becomes a performance issue, it should be moved to where it's needed
  */
  const receivedContacts = await fetchContacts();
  store.dispatch(setContacts(receivedContacts));
  store.dispatch(setContactsLoaded(true));
}

async function load() {
  try {
    // fetchSystemInformation will throw an exception if user is not logged in
    const loginInformation = await fetchLoginStatus();
    store.dispatch(setLoginStatus(loginInformation));

    await loadInitialData();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="" element={<Dashboard />} />
              <Route path="journal" element={<JournalList />} />
              <Route path="journal/:id" element={<JournalEntry />} />
              <Route path="journal/:id/edit" element={<JournalEntryEditor />} />
              <Route path="journal/new" element={<JournalEntryCreator />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="contacts" element={<Contacts />} />
              <Route path="contacts/:id" element={<ContactViewer />} />
              <Route path="contacts/new" element={<ContactCreator />} />
            </Route>
            <Route path="*" element={<span>404, that&apos;s all.</span>} />
          </Routes>
        </BrowserRouter>
      </Provider>,
      document.querySelector('body > main'),
    );
  } catch (e) {
    if (e instanceof UnauthorisedException) {
      render(<Login />, document.querySelector('body > main'));
    } else {
      document.querySelector('body > main').innerHTML = 'Yeah, that doesn\'t look right.';
    }
  }
}

load();
