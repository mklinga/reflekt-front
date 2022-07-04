import { marked } from 'marked';
import * as React from 'react';
import { SearchResult } from '../../types/journalTypes';

type Props = {
  data: SearchResult;
  query: string | undefined;
}

const EXCERPT_LENGTH = 300;

function parseVisibleEntry(entry: string, open: boolean, query: string | undefined) {
  const visiblePart = open ? entry : `${entry.substring(0, EXCERPT_LENGTH)}...`;
  const parsedDocument = marked.parse(visiblePart);
  if (query) {
    /* Highlight the query part - ($& in the expression fills the existing text) */
    const highlightStyle = 'background: #a6f5a0; padding: 0 2px;';
    return parsedDocument.replaceAll(new RegExp(query, 'gi'), `<span style="${highlightStyle}">$&</span>`);
  }

  return parsedDocument;
}

export default function SearchResultItem(props: Props) {
  const { data: { entry, title }, query } = props;

  const [open, setOpen] = React.useState<boolean>(false);
  const visibleEntry = parseVisibleEntry(entry, open, query);

  return (
    <div className="bg-gray-100 p-4 m-4 border border-gray-300 rounded">
      <h2 className="text-lg font-medium text-black py-3">
        <button className="text-blue-600 mr-3" type="button" onClick={() => setOpen(!open)}>
          {open ? '[-]' : '[+]'}
        </button>
        {title}
      </h2>
      {/* eslint-disable react/no-danger */}
      <div className="journal-document" dangerouslySetInnerHTML={{ __html: visibleEntry }} />
      {/* eslint-enable react/no-danger */}
    </div>
  );
}
