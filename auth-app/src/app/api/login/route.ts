import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  const host = request.headers.get('host') || '';
  
  const domain = host.split('.').length > 2
    ? '.' + host.split('.').slice(-2).join('.')
    : '.' + host;

  const response = NextResponse.json({ message: `login to ${domain} successful` });
  
  response.cookies.set('auth_token', 'authenticated', {
    domain,
    path: '/',
    expires,
    secure: true,
    httpOnly: true,
    sameSite: 'lax'
  });

  return response;
}