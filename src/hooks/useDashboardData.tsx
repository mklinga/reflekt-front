import * as React from 'react';
import fetchDashboardData from '../services/dashboard';
import { DashboardData, DashboardDataHook } from '../types/types';

export default function useDashboardData(): DashboardDataHook {
  const [loaded, setLoaded] = React.useState(false);
  const [dashboardData, setDashboardData] = React.useState<DashboardData>(null);

  React.useEffect(() => {
    setLoaded(false);
    setDashboardData(null);
    fetchDashboardData(setDashboardData).then(() => setLoaded(true));
  }, []);

  return {
    dashboardData,
    loadingStatus: loaded ? 'resolved' : 'loading',
  };
}
