import * as React from 'react';
import { fetchJournalEntry } from '../services/journal';
import { JournalEntryHook, JournalEntryType, JournalNavigationData } from '../types/types';

export default function useJournalEntry(id: string): JournalEntryHook {
  const [loaded, setLoaded] = React.useState(false);
  const [journalEntry, setJournalEntry] = React.useState<JournalEntryType>(null);
  const [navigationData, setNavigationData] = React.useState<JournalNavigationData>(null);

  React.useEffect(() => {
    setLoaded(false);
    setJournalEntry(null);
    setNavigationData(null);
    fetchJournalEntry(id, setJournalEntry, setNavigationData).then(() => setLoaded(true));
  }, [id]);

  return {
    journalEntry,
    navigationData,
    loadingStatus: loaded ? 'resolved' : 'loading',
  };
}
