import * as React from 'react';
import { ImageType } from '../../../types/journalTypes';

type Props = {
  data: ImageType[];
};

function getImageUrl(image: string): string {
  return `/api/images/${image}`;
}

export default function ImageViewer(props: Props) {
  const { data } = props;

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <div>
      {data.map((image) => (
        <img className="max-h-[60vh] m-auto" key={image.id} src={getImageUrl(image.id)} alt={image.name} />
      ))}
    </div>
  );
}
