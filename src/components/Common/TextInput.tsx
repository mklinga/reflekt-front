import * as React from 'react';
import classes from '../../utils/classes';

type Props = {
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler;
  onKeyPress?: React.KeyboardEventHandler;
}

export default function TextInput(props: Props) {
  const {
    placeholder, defaultValue, onChange, onKeyPress, className,
  } = props;

  const finalClassName = classes(['border', className]);

  return (
    <input
      type="text"
      className={finalClassName}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
}

TextInput.defaultProps = {
  placeholder: undefined,
  defaultValue: undefined,
  onChange: undefined,
  onKeyPress: undefined,
  className: undefined,
};
