import * as React from 'react';
import { useParams } from 'react-router';

type Props = {
  data: string[];
}

export default function ImageModuleEditor(props: Props) {
  const { data } = props;
  const params = useParams();

  function onFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    /* TODO: move all this to some service */
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('journalEntry', params.id);

    fetch('/api/images', { method: 'POST', body: formData });
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>
          {data && data.length > 0 ? data.length : 'No'}
          {' '}
          uploaded images

        </span>
        <label htmlFor="imageUploadInput">
          Upload new image
          <input className="hidden" id="imageUploadInput" type="file" onChange={onFileSelection} />
        </label>
      </div>
    </div>
  );
}
