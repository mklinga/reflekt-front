import * as React from 'react';
import useQuery from '../../hooks/useQuery';
import useSearchResults from '../../hooks/useSearchResult';
import SearchResultItem from './SearchResultItem';

function makeSearchText(query: string | undefined, tag: string | undefined) {
  return (
    <span>
      Searching for
      {query
        ? (
          <span>
            {' text: '}
            <strong>{query}</strong>
          </span>
        )
        : null}
      {query && tag ? ' and ' : null}
      {tag
        ? (
          <span>
            {' tag: '}
            <strong>{tag}</strong>
          </span>
        )
        : null}

    </span>
  );
}

export default function SearchPage() {
  const params = useQuery();
  const query = params.get('query');
  const tag = params.get('tag');
  const searchString = makeSearchText(query, tag);

  const { searchResults, loadingStatus } = useSearchResults(query, tag);

  return (
    <div>
      <h1>
        {searchString}
      </h1>
      {loadingStatus === 'resolved'
        ? searchResults.map((searchResult) => (
          <SearchResultItem data={searchResult} key={searchResult.id} />))
        : <span>Fetching results...</span>}
    </div>
  );
}
