import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJournalEntry } from '../services/journal';
import { RootState } from '../store';
import { selectJournalEntryById } from '../store/journalEntry/journalEntrySelectors';
import { updateEntry } from '../store/journalEntry/journalEntrySlice';
import { JournalEntryHook, JournalNavigationData } from '../types/journalTypes';

export default function useJournalEntry(id: string): JournalEntryHook {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = React.useState(null);
  const [navigationData, setNavigationData] = React.useState<JournalNavigationData>(null);
  const journalEntry = useSelector((state: RootState) => selectJournalEntryById(state, id));

  React.useEffect(() => {
    setLoaded(null);
    setNavigationData(null);
    fetchJournalEntry(id, setNavigationData)
      .then((data) => {
        dispatch(updateEntry(data));
        setLoaded(id);
      });
  }, [id]);

  return {
    journalEntry,
    navigationData,
    loadingStatus: (loaded === id) ? 'resolved' : 'loading',
  };
}
