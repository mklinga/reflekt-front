import * as React from 'react';
import { ImageModuleDto, JournalEntryType } from '../../../types/types';

type Props = {
  data: ImageModuleDto[];
  entryId: string;
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>;
}

function removeImage(
  imageId: string,
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>,
) {
  return async function onClick() {
    const response = await fetch(`/api/images/${imageId}`, { method: 'DELETE' });
    if (response.status !== 200) {
      // TODO: Do something else //
      /* eslint-disable no-console */
      console.error('DELETING image failed 🤷‍♀️');
      console.log(response);
      /* eslint-enable no-console */
      return;
    }

    updateEntry(
      (data) => ({ ...data, images: data.images.filter((image) => image.id !== imageId) }),
    );
  };
}

function imageBar(
  data: ImageModuleDto[],
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>,
) {
  return (
    <p>
      {data.map((image) => (
        <button key={image.id} type="button" onClick={removeImage(image.id, updateEntry)}>
          <img className="h-40 mr-1" src={`/api/images/${image.id}`} alt={image.name} />
        </button>
      ))}
    </p>
  );
}

function getOnChangeFunction(
  entryId: string,
  updateEntry: React.Dispatch<React.SetStateAction<JournalEntryType>>,
) {
  return async function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    /* TODO: move all this to some service */
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('journalEntry', entryId);

    const response = await fetch('/api/images', { method: 'POST', body: formData });
    if (response.status !== 200) {
      // TODO: Do something else //
      /* eslint-disable no-console */
      console.error(response);
      /* eslint-enable no-console */
      return;
    }

    const savedImage = await response.json() as ImageModuleDto;
    updateEntry((data) => ({ ...data, images: [...data.images, savedImage] }));
  };
}

export default function ImageEditor(props: Props) {
  const { data, entryId, updateEntry } = props;

  if (!entryId) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>
          {data && data.length > 0 ? imageBar(data, updateEntry) : 'No uploaded images'}
        </span>
        <label className="text-blue-600" htmlFor="imageUploadInput">
          Upload new image
          <input
            className="hidden"
            id="imageUploadInput"
            type="file"
            onChange={getOnChangeFunction(entryId, updateEntry)}
          />
        </label>
      </div>
    </div>
  );
}
