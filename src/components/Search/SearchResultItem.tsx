import * as React from 'react';
import { SearchResult } from '../../types/types';

type Props = {
  data: SearchResult;
}

export default function SearchResultItem(props: Props) {
  const { data } = props;

  return (
    <div>
      <h2 className="text-lg font-medium text-black py-3">{data.title}</h2>
      <p>{data.entry}</p>
    </div>
  );
}
