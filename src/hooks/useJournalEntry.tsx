import * as React from 'react';
import { fetchJournalEntry } from '../services/journal';
import { JournalEntryHook, JournalEntryType } from '../types/types';

export default function useJournalEntry(id: string): JournalEntryHook {
  const [loaded, setLoaded] = React.useState(false);
  const [journalEntry, setJournalEntry] = React.useState<JournalEntryType>(null);

  React.useEffect(() => {
    setLoaded(false);
    setJournalEntry(null);
    fetchJournalEntry(id, setJournalEntry).then(() => setLoaded(true));
  }, []);

  return {
    journalEntry,
    loadingStatus: loaded ? 'resolved' : 'loading',
  };
}
