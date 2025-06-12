import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const host = request.headers.get('host') || '';
  
  const domain = host.split('.').length > 2
    ? '.' + host.split('.').slice(-2).join('.')
    : '.' + host;
    
  const response = NextResponse.json({ message: 'logged out' });
  response.cookies.set('auth_token', '', {
    domain,
    path: '/',
    expires: new Date(0), // Expire immediately
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
  });
  return response;
}