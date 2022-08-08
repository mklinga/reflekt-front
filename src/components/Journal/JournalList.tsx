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

const DEFAULT_LIMIT = 14;
export default function JournalList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const journalEntries = useSelector(selectListOfEntries);
  const loaded = useSelector(selectListOfEntriesLoaded);

  const loadElements = (limit: number) => {
    dispatch(setListOfEntriesLoaded('not-loaded'));
    fetchLatestJournalEntries(limit).then((data: JournalEntryType[]) => {
      dispatch(setListOfEntriesData(data));
      dispatch(setListOfEntriesLoaded(limit ? 'partial' : 'full'));
    });
  };

  useEffect(() => {
    if (loaded === 'not-loaded') {
      loadElements(DEFAULT_LIMIT);
    }
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
      {loaded === 'not-loaded'
        ? <span>Loading...</span>
        : journalEntries.map((entry) => <JournalListItem key={entry.id} entry={entry} />)}
      {loaded === 'partial'
        ? (
          <div className="text-center mt-6">
            <ActionButton secondary onClick={() => loadElements(null)}>
              Load all
            </ActionButton>
          </div>
        ) : null}
    </div>
  );
}
