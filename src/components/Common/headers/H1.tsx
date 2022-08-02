import * as React from 'react';
import classes from '../../../utils/classes';

type Props = {
  children: React.ReactNode;
  className?: string;
}

export default function H1(props: Props) {
  const { children, className } = props;
  const finalClassName = classes([className, 'text-xl font-medium text-black']);

  return (
    <h1 className={finalClassName}>
      {children}
    </h1>
  );
}

H1.defaultProps = {
  className: '',
};
