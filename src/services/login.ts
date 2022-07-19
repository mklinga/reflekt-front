import { LoginResponse } from '../types/login';
import UnauthorisedException from '../utils/exceptions/UnauthorisedException';

export async function login(user: string, password: string): Promise<boolean> {
  const data = new URLSearchParams();
  data.append('user', user);
  data.append('password', password);

  const response = await fetch(
    '/api/login',
    {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    },
  );

  return (response.status === 200);
}

export async function fetchLoginStatus(): Promise<LoginResponse> {
  const response = await fetch('/api/login');

  if (response.ok) {
    return response.json() as Promise<LoginResponse>;
  }

  if (response.status === 401) {
    throw new UnauthorisedException();
  }

  throw Error('Unexpected error');
}
