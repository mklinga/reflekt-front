import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJournalEntry } from '../services/journal';
import { RootState } from '../store';
import { selectJournalEntryById } from '../store/journalEntry/journalEntrySelectors';
import { updateEntry } from '../store/journalEntry/journalEntrySlice';
import { JournalEntryHook, JournalNavigationData } from '../types/types';

export default function useJournalEntry(id: string): JournalEntryHook {
  const dispatch = useDispatch();
  const [loaded, setLoaded] = React.useState(false);
  const [navigationData, setNavigationData] = React.useState<JournalNavigationData>(null);
  const journalEntry = useSelector((state: RootState) => selectJournalEntryById(state, id));

  React.useEffect(() => {
    setLoaded(false);
    setNavigationData(null);
    fetchJournalEntry(id, setNavigationData)
      .then((data) => {
        dispatch(updateEntry(data));
        setLoaded(true);
      });
  }, [id]);

  return {
    journalEntry,
    navigationData,
    loadingStatus: loaded ? 'resolved' : 'loading',
  };
}
