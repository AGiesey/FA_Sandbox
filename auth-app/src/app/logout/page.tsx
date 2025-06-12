
'use client';
import { useEffect } from 'react';

const REDIRECT_URL = process.env.NEXT_PUBLIC_REDIRECT_URL || 'https://client.adamgiesey.com';

export default function Logout() {

  const handleRedirect = () => {
    window.location.href = REDIRECT_URL;
  }

  useEffect(() => {
    fetch('/api/logout')
      .then(response => console.log(response))
      .then(handleRedirect)
  });
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Logging Out...</h1>
    </div>
  )
}