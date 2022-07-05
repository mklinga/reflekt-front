import * as React from 'react';
import classes from '../../utils/classes';

type Props = {
  autoFocus?: boolean;
  className?: string;
  defaultValue?: string;
  name?: string;
  onChange?: React.ChangeEventHandler;
  onKeyPress?: React.KeyboardEventHandler;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

export default function TextInput(props: Props) {
  const {
    autoFocus, placeholder, defaultValue, onChange, onKeyPress, className, type, name,
  } = props;

  const finalClassName = classes(['border border-slate-300 rounded', className]);

  return (
    <input
      autoFocus={autoFocus}
      type={type}
      name={name}
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
  name: undefined,
  onChange: undefined,
  onKeyPress: undefined,
  placeholder: undefined,
  type: 'text',
};
