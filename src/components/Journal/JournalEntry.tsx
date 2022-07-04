import { marked } from 'marked';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import useJournalEntry from '../../hooks/useJournalEntry';
import { JournalEntryType, JournalNavigationData } from '../../types/journalTypes';
import LoaderUntilResolved from '../LoaderUntilResolved';
import ImageViewer from './Modules/ImageViewer';
import TagViewer from './Modules/TagViewer';
import LinkComponent from '../Common/Link';
import { dateStringToLocale } from '../../utils/date';

function renderEntryView(
  journalEntry: JournalEntryType,
  navigationData: JournalNavigationData,
) {
  const {
    id,
    mood,
    title,
    entry,
    entryDate,
    tags,
    images,
  } = journalEntry;

  const journalDocument = marked.parse(entry);
  const editLink = `/journal/${id}/edit`;
  const nextLink = navigationData && navigationData.next ? `/journal/${navigationData.next}` : null;
  const previousLink = navigationData && navigationData.previous ? `/journal/${navigationData.previous}` : null;

  return (
    <div>
      <div className="flex justify-between">
        <span className="text-gray-400 text-sm">{dateStringToLocale(entryDate)}</span>
        <Link to={editLink}>
          <button type="button" className="pr-3">Edit</button>
        </Link>
      </div>
      <div className="flex py-3 items-center">
        <span className="md:text-2xl">{mood}</span>
        <span className="font-bold md:font-normal md:text-2xl flex-grow pl-3">{title}</span>
      </div>
      {images ? <ImageViewer data={images} /> : null}
      {tags ? <TagViewer data={tags} /> : null}
      {/*
        We cannot use tailwind to style the markdown document (not possible to inject style classes)
        so we will have to use "real" class name and external styling (see journal.css)
      */}
      {/* eslint-disable react/no-danger */}
      <div className="journal-document" dangerouslySetInnerHTML={{ __html: journalDocument }} />
      {/* eslint-enable react/no-danger */}
      <div className="mt-9 mb-6">
        {previousLink ? <LinkComponent to={previousLink}>Previous</LinkComponent> : null}
        {(previousLink && nextLink) ? ' - ' : null}
        {nextLink ? <LinkComponent to={nextLink}>Next</LinkComponent> : null}
      </div>
    </div>
  );
}

export default function JournalEntry() {
  const params = useParams();
  const {
    journalEntry, navigationData, loadingStatus: entryLoadingStatus,
  } = useJournalEntry(params.id);

  return (
    <LoaderUntilResolved
      loadingStatus={[entryLoadingStatus]}
      render={() => renderEntryView(journalEntry, navigationData)}
    />
  );
}
