import * as React from 'react';
import { useParams } from 'react-router';

export default function SearchPage() {
  const { term } = useParams();

  return (
    <div>
      <h1>
        Search results for &quot;
        {term}
        &quot;
        :
      </h1>
    </div>
  );
}
