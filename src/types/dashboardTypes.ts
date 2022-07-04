import { LoadingStatus } from './types';

export type DashboardData = {
  entryCount: number;
  updateCount: number;
}

export type DashboardDataHook = {
  dashboardData: DashboardData;
  loadingStatus: LoadingStatus;
}
