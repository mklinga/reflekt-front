import * as React from 'react';
import { ImageModuleDto, JournalModuleDataType } from '../../../types/types';

type Props = {
  data: ImageModuleDto[];
  entryId: string;
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>;
}

function removeImage(
  imageId: string,
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>,
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

    updateModuleData(
      (data) => ({ ...data, images: data.images.filter((image) => image.id !== imageId) }),
    );
  };
}

function imageBar(
  data: ImageModuleDto[],
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>,
) {
  return (
    <p>
      {data.map((image) => (
        <button key={image.id} type="button" onClick={removeImage(image.id, updateModuleData)}>
          <img className="h-40 mr-1" src={`/api/images/${image.id}`} alt={image.name} />
        </button>
      ))}
    </p>
  );
}

function getOnChangeFunction(
  entryId: string,
  updateModuleData: React.Dispatch<React.SetStateAction<JournalModuleDataType>>,
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
    updateModuleData((data) => ({ ...data, images: [...data.images, savedImage] }));
  };
}

export default function ImageModuleEditor(props: Props) {
  const { data, entryId, updateModuleData } = props;

  if (!entryId) {
    return null;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <span>
          {data && data.length > 0 ? imageBar(data, updateModuleData) : 'No uploaded images'}
        </span>
        <label htmlFor="imageUploadInput">
          Upload new image
          <input
            className="hidden"
            id="imageUploadInput"
            type="file"
            onChange={getOnChangeFunction(entryId, updateModuleData)}
          />
        </label>
      </div>
    </div>
  );
}
