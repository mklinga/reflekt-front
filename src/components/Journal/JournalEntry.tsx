import * as React from 'react';
import { useParams } from 'react-router-dom';
import { fetchJournalEntry } from '../../services/journal';
import { JournalEntryType } from '../../types/types';

export default function JournalEntry() {
  const params = useParams();
  const [loaded, setLoaded] = React.useState(false);
  const [journalEntry, setJournalEntry] = React.useState<JournalEntryType>(null);

  React.useEffect(() => {
    setLoaded(false);
    setJournalEntry(null);
    fetchJournalEntry(params.id, setJournalEntry).then(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return (
      <div>
        Loading item
        {params.id}
        ...
      </div>
    );
  }

  return (
    <span>{JSON.stringify(journalEntry)}</span>
  );
}
