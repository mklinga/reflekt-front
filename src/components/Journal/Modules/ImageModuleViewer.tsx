import * as React from 'react';

type Props = {
  data: string[];
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
      {data.map((image) => <img key={image} src={getImageUrl(image)} alt="" />)}
    </div>
  );
}
