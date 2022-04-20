import * as React from 'react';
import { saveNewTag } from '../../../services/tags';
import { TagModuleDto } from '../../../types/types';

type Props = {
  setTags: React.Dispatch<React.SetStateAction<TagModuleDto[]>>
}

export default function TagEditorInline(props: Props) {
  const { setTags } = props;
  const name = React.useRef(null);
  const color = React.useRef(null);

  async function addNewTag(/* e: React.MouseEvent */) {
    const nameValue = name.current.value;
    const colorValue = color.current.value;

    /* TODO: maybe validate a bit more */
    /* eslint-disable no-alert */
    if (!nameValue || !colorValue) {
      alert('Both fields must have a value!');
      return;
    }

    if (!colorValue.match(/^#([\da-f]{3}$)|([\da-f]{6}$)/i)) {
      alert('color bad');
    }
    /* eslint-enable no-alert */

    /* eslint-disable no-console */
    const [savedTag, fetchStatus] = await saveNewTag(nameValue, colorValue);
    if (fetchStatus === 'SUCCESS') {
      setTags((tags) => tags.concat(savedTag));
    } else {
      console.warn('Saving new data was not a SUCCESS');
    }
    /* eslint-enable no-console */
  }

  return (
    <>
      <input ref={name} type="text" name="name" placeholder="Tag name" />
      <input ref={color} type="text" name="color" placeholder="Tag color" pattern="#\d{3,6}" />
      <button type="button" onClick={addNewTag}>Add</button>
    </>
  );
}
