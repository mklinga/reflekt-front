import * as React from 'react';
import { SearchResult } from '../types/journalTypes';
import { fetchJsonData } from '../utils/fetch';
import * as querystring from '../utils/querystring';

type SetSearchResultData = React.Dispatch<React.SetStateAction<SearchResult[]>>;
export default async function fetchSearchResults(
  setData: SetSearchResultData,
  query: string | undefined,
  tag: string | undefined,
) {
  const params = querystring.stringify({ query, tag });
  const endpoint = `/api/search${params}`;
  const [data, status] = await fetchJsonData<SearchResult[]>(endpoint);
  switch (status) {
    case 'SUCCESS':
      setData(data);
      break;
    default:
    // TODO: do something
  }
}
