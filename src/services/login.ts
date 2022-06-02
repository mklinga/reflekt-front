export default async function login(user: string, password: string): Promise<boolean> {
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
