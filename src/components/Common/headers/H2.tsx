import * as React from 'react';
import classes from '../../../utils/classes';

type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function H2(props: Props) {
  const { children, className } = props;
  const finalClassName = classes([className, 'text-lg font-medium text-black']);

  return (
    <h2 className={finalClassName}>
      {children}
    </h2>
  );
}

H2.defaultProps = {
  className: '',
};
