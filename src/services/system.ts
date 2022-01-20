import UnauthorisedException from '../utils/exceptions/UnauthorisedException';

export default async function fetchSystemInformation() {
  const response = await fetch('/api/login');

  if (response.ok) {
    return response.json();
  }

  if (response.status === 401) {
    throw new UnauthorisedException();
  }

  throw Error('Unexpected error');
}
