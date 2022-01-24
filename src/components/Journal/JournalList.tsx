import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchAllJournalEntries } from '../../services/journal';
import { JournalListItemType } from '../../types/types';
import Link from '../Common/Link';
import JournalListItem from './JournalListItem';

export default function JournalList() {
  const [loaded, setLoaded] = useState(false);
  const [journalEntries, setJournalEntries] = useState<JournalListItemType[]>(null);

  useEffect(() => {
    setLoaded(false);
    setJournalEntries(null);
    fetchAllJournalEntries(setJournalEntries)
      .then(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/journal/new">+ Add new entry</Link>
      {journalEntries.map((entry) => <JournalListItem key={entry.id} entry={entry} />)}
    </div>
  );
}
