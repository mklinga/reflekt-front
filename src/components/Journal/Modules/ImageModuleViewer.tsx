import * as React from 'react';
import { ImageModuleDto } from '../../../types/types';

type Props = {
  data: ImageModuleDto[];
};

function getImageUrl(image: string): string {
  return `/api/images/${image}`;
}

export default function ImageModuleViewer(props: Props) {
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
