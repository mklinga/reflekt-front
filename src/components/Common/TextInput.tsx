import * as React from 'react';
import classes from '../../utils/classes';

type Props = {
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler;
  onKeyPress?: React.KeyboardEventHandler;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

export default function TextInput(props: Props) {
  const {
    autoFocus, placeholder, defaultValue, onChange, onKeyPress, className, type,
  } = props;

  const finalClassName = classes(['border', className]);

  return (
    <input
      autoFocus={autoFocus}
      type={type}
      className={finalClassName}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
}

TextInput.defaultProps = {
  autoFocus: false,
  className: undefined,
  defaultValue: undefined,
  onChange: undefined,
  onKeyPress: undefined,
  placeholder: undefined,
  type: 'text',
};
