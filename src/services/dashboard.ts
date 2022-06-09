import * as React from 'react';
import { DashboardData } from '../types/types';
import { fetchJsonData } from '../utils/fetch';

type setDashboardData = React.Dispatch<React.SetStateAction<DashboardData>>;
export default async function fetchSearchResults(setData: setDashboardData) {
  const endpoint = '/api/dashboard';
  const [data, status] = await fetchJsonData<DashboardData>(endpoint);
  switch (status) {
    case 'SUCCESS':
      setData(data);
      break;
    default:
    // TODO: do something
  }
}
