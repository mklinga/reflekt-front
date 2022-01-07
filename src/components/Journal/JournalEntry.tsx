import { marked } from 'marked';
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

  const {
    mood,
    title,
    entry,
    entryDate,
  } = journalEntry;

  const journalDocument = marked.parse(entry);

  /* eslint-disable react/no-danger */
  return (
    <div>
      <div className="flex py-3 items-center">
        <span className="text-2xl">{mood}</span>
        <span className="text-2xl flex-grow pl-3">{title}</span>
        <span className="text-gray-400 text-sm">{entryDate.toLocaleDateString()}</span>
      </div>
      {/*
        We cannot use tailwind to style the markdown document (not possible to inject style classes)
        so we will have to use "real" class name and external styling (see journal.css)
      */}
      <div className="journal-document" dangerouslySetInnerHTML={{ __html: journalDocument }} />
    </div>
  );
}
