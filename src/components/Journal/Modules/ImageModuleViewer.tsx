import * as React from 'react';

type Props = {
  data: string[];
};

function getImageUrl(image: string): string {
  return `/api/images/${'3419f34f-fe2e-4769-bbd9-8c89958f0edf'}`;
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
