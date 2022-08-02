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
}

export default function TextArea(props: Props) {
  const {
    autoFocus, placeholder, defaultValue, onChange, onKeyPress, className, name,
  } = props;

  const finalClassName = classes(['border border-slate-300 rounded', className]);

  return (
    <textarea
      autoFocus={autoFocus}
      name={name}
      className={finalClassName}
      placeholder={placeholder}
      defaultValue={defaultValue}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
}

TextArea.defaultProps = {
  autoFocus: false,
  className: undefined,
  defaultValue: undefined,
  name: undefined,
  onChange: undefined,
  onKeyPress: undefined,
  placeholder: undefined,
};
