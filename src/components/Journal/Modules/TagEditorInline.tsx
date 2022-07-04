import * as React from 'react';
import { saveNewTag } from '../../../services/tags';
import { TagType } from '../../../types/journalTypes';
import { sortByColorAndName } from '../../../utils/tags';

type Props = {
  setTags: React.Dispatch<React.SetStateAction<TagType[]>>,
  toggleEditor: () => void;
}

export default function TagEditorInline(props: Props) {
  const { setTags, toggleEditor } = props;
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

    const [savedTag, fetchStatus] = await saveNewTag(nameValue, colorValue);
    if (fetchStatus === 'SUCCESS') {
      setTags((tags) => sortByColorAndName(tags.concat(savedTag)));
    } else {
      /* eslint-disable no-console */
      console.warn('Saving new data was not a SUCCESS');
      /* eslint-enable no-console */
    }
    toggleEditor();
  }

  return (
    <>
      <input ref={name} type="text" name="name" placeholder="Tag name" />
      <input ref={color} type="text" name="color" placeholder="Tag color" pattern="#\d{3,6}" />
      <button type="button" onClick={addNewTag}>Add</button>
    </>
  );
}
