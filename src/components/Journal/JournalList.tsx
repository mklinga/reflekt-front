import * as React from 'react';
import { useEffect, useState } from 'react';
import { fetchAllJournalEntries } from '../../services/journal';
import { JournalListItemType } from '../../types/types';
import Link from '../Common/Link';
import JournalListFilter from './JournalListFilter';
import JournalListItem from './JournalListItem';

export default function JournalList() {
  const [loaded, setLoaded] = useState(false);
  const [journalEntries, setJournalEntries] = useState<JournalListItemType[]>(null);
  const [filterValue, setFilterValue] = React.useState('');

  useEffect(() => {
    setLoaded(false);
    setJournalEntries(null);
    fetchAllJournalEntries(setJournalEntries, filterValue)
      .then(() => setLoaded(true));
  }, [filterValue]);

  return (
    <div>
      <div className="flex justify-between">
        <Link className="text-blue-600 mr-3 whitespace-nowrap" to="/journal/new">
          + Add new entry
        </Link>
        <JournalListFilter value={filterValue} setValue={setFilterValue} />
      </div>
      {loaded
        ? journalEntries.map((entry) => <JournalListItem key={entry.id} entry={entry} />)
        : <span>Loading...</span>}
    </div>
  );
}
