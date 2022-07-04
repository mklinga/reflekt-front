import * as React from 'react';
import fetchSearchResults from '../services/search';
import { SearchResult, SearchResultHook } from '../types/journalTypes';

export default function useSearchResults(
  query: string | undefined,
  tag: string | undefined,
): SearchResultHook {
  const [loaded, setLoaded] = React.useState(false);
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);

  React.useEffect(() => {
    setLoaded(false);
    setSearchResults([]);
    fetchSearchResults(setSearchResults, query, tag).then(() => setLoaded(true));
  }, [query, tag]);

  return {
    searchResults,
    loadingStatus: loaded ? 'resolved' : 'loading',
  };
}
