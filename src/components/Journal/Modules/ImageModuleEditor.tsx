import * as React from 'react';
import { useParams } from 'react-router';

type Props = {
  data: string[];
}

export default function ImageModuleEditor(props: Props) {
  const { data } = props;
  const params = useParams();

  function onFileSelection(event: React.ChangeEvent<HTMLInputElement>) {
    console.log('Selected file', event.target.files);
    console.log('Sending to server');
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('journalEntry', params.id);

    fetch('/api/images', { method: 'POST', body: formData });
  }

  return (
    <div>
      <h6>Uploaded images</h6>
      <div className="flex justify-between items-center">
        <span>{data.join(', ')}</span>
        <label htmlFor="imageUploadInput">
          Upload new image
          <input className="hidden" id="imageUploadInput" type="file" onChange={onFileSelection} />
        </label>
      </div>
    </div>
  );
}
