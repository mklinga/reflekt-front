import { marked } from 'marked';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import useJournalEntry from '../../hooks/useJournalEntry';
import useJournalModules from '../../hooks/useJournalModules';
import { JournalEntryType, JournalModuleDataType } from '../../types/types';
import LoaderUntilResolved from '../LoaderUntilResolved';
import ImageModuleViewer from './Modules/ImageModuleViewer';

function renderEntryView(journalEntry: JournalEntryType, moduleData: JournalModuleDataType) {
  const {
    id,
    mood,
    title,
    entry,
    entryDate,
  } = journalEntry;

  const journalDocument = marked.parse(entry);
  const editLink = `/journal/${id}/edit`;

  return (
    <div>
      <div className="flex py-3 items-center">
        <span className="text-2xl">{mood}</span>
        <span className="text-2xl flex-grow pl-3">{title}</span>
        <Link to={editLink}>
          <button type="button" className="pr-3">Edit</button>
        </Link>
        <span className="text-gray-400 text-sm">{entryDate.toLocaleDateString()}</span>
      </div>
      {moduleData.images ? <ImageModuleViewer data={moduleData.images} /> : null}
      {/*
        We cannot use tailwind to style the markdown document (not possible to inject style classes)
        so we will have to use "real" class name and external styling (see journal.css)
      */}
      {/* eslint-disable react/no-danger */}
      <div className="journal-document" dangerouslySetInnerHTML={{ __html: journalDocument }} />
      {/* eslint-enable react/no-danger */}
    </div>
  );
}

export default function JournalEntry() {
  const params = useParams();
  const { journalEntry, loadingStatus: entryLoadingStatus } = useJournalEntry(params.id);
  const { moduleData, loadingStatus: moduleLoadingStatus } = useJournalModules(params.id);

  return (
    <LoaderUntilResolved
      loadingStatus={[entryLoadingStatus, moduleLoadingStatus]}
      render={() => renderEntryView(journalEntry, moduleData)}
    />
  );
}