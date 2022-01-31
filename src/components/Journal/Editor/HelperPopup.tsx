import * as React from 'react';
import HelpIcon from '../../../icons/HelpIcon';
import Overlay from '../../Common/Overlay';
import thoughtErrors from '../../../services/thoughtErrors';

export default function HelperPopup() {
  const [toggled, setToggled] = React.useState(false);

  if (!toggled) {
    return (
      <button type="button" onClick={() => setToggled(!toggled)}>
        <HelpIcon />
      </button>
    );
  }

  return (
    <div className="relative">
      <Overlay onClick={() => setToggled(!toggled)} />
      <div className="fixed left-1/2 translate-x-[-50%] bg-white right-0 w-[80vw] max-w-screen-lg max-h-[40rem] p-3 overflow-y-scroll">
        {thoughtErrors.map(({ title, description }) => (
          <div key={title}>
            <strong>{title}</strong>
            <p>{description}</p>
          </div>
        ))}

      </div>
    </div>
  );
}
