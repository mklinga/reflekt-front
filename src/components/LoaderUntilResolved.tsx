import * as React from 'react';
import { LoadingStatus } from '../types/types';
import Spinner from './Common/Spinner';

type Props = {
  loadingStatus: LoadingStatus | LoadingStatus[];
  render: () => JSX.Element;
}

export default function LoaderUntilResolved(props: Props) {
  const { loadingStatus, render } = props;

  const hasLoaded = Array.isArray(loadingStatus)
    ? loadingStatus.every((status) => status === 'resolved')
    : loadingStatus === 'resolved';

  if (hasLoaded) {
    return render();
  }

  return (
    <div className="flex items-center p-3">
      <Spinner />
      Loading...
    </div>
  );
}
