import * as React from 'react';
import useDashboardData from '../../hooks/useDashboardData';
import { DashboardData } from '../../types/dashboardTypes';
import HighlightItem from '../Common/HighlightItem';
import Spinner from '../Common/Spinner';

type Props = {
  data: DashboardData;
}

function DashboardImpl(props: Props) {
  const { data } = props;

  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <HighlightItem label="Entries" info={data.entryCount} />
        <HighlightItem label="Updates" info={data.updateCount} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { dashboardData, loadingStatus } = useDashboardData();

  return (
    <div>
      {loadingStatus === 'resolved'
        ? <DashboardImpl data={dashboardData} />
        : <Spinner />}
    </div>
  );
}
