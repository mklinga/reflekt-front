import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllJournalEntries } from '../../services/journal';
import { selectListOfEntries, selectListOfEntriesLoaded } from '../../store/journalEntry/journalEntrySelectors';
import { setListOfEntriesData, setListOfEntriesLoaded } from '../../store/journalEntry/journalEntrySlice';
import { JournalEntryType } from '../../types/types';
import Link from '../Common/Link';
import JournalListFilter from './JournalListFilter';
import JournalListItem from './JournalListItem';

export default function JournalList() {
  const dispatch = useDispatch();
  const journalEntries = useSelector(selectListOfEntries);
  const loaded = useSelector(selectListOfEntriesLoaded);

  useEffect(() => {
    if (loaded) {
      return;
    }

    fetchAllJournalEntries().then((data: JournalEntryType[]) => {
      dispatch(setListOfEntriesData(data));
      dispatch(setListOfEntriesLoaded(true));
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <Link className="text-blue-600 mr-3 whitespace-nowrap" to="/journal/new">
          + Add new entry
        </Link>
        <JournalListFilter />
      </div>
      {loaded
        ? journalEntries.map((entry) => <JournalListItem key={entry.id} entry={entry} />)
        : <span>Loading...</span>}
    </div>
  );
}
