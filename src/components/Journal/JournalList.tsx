import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchLatestJournalEntries } from '../../services/journal';
import { selectListOfEntries, selectListOfEntriesLoaded } from '../../store/journalEntry/journalEntrySelectors';
import { setListOfEntriesData, setListOfEntriesLoaded } from '../../store/journalEntry/journalEntrySlice';
import { JournalEntryType } from '../../types/journalTypes';
import ActionButton from '../Common/ActionButton';
import JournalListFilter from './JournalListFilter';
import JournalListItem from './JournalListItem';

export default function JournalList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const journalEntries = useSelector(selectListOfEntries);
  const loaded = useSelector(selectListOfEntriesLoaded);

  useEffect(() => {
    if (loaded) {
      return;
    }

    fetchLatestJournalEntries(14).then((data: JournalEntryType[]) => {
      dispatch(setListOfEntriesData(data));
      dispatch(setListOfEntriesLoaded(true));
    });
  }, []);

  const addNewEntryClick = () => {
    navigate('/journal/new');
  };

  return (
    <div>
      <JournalListFilter />
      <div className="flex justify-end">
        <ActionButton onClick={addNewEntryClick}>
          + New entry
        </ActionButton>
      </div>
      {loaded
        ? journalEntries.map((entry) => <JournalListItem key={entry.id} entry={entry} />)
        : <span>Loading...</span>}
    </div>
  );
}
