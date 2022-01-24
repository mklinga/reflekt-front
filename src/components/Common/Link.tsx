import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  to: string;
  className?: string;
}

export default function Link(props: Props) {
  const { children, to, className } = props;

  return (
    <span className={className}>
      <RouterLink to={to}>
        {children}
      </RouterLink>
    </span>
  );
}

Link.defaultProps = {
  className: 'text-blue-600',
};
