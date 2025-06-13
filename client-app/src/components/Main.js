'use client';
import { useState, useEffect } from 'react';
import { Authenticated } from './Authenticated';
import { Unauthenticated } from './Unauthenticated';
import { Loading } from './Loading';
import './Main.css';

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL || 'https://auth.adamgiesey.com';

export function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authenticate();
  }, [])
  
  const authenticate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.adamgiesey.com/api/check-cookie', {
        credentials: 'include',
        headers: {
          'Origin': window.location.origin
        }
      });
      setIsAuthenticated(response.status === 200);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }

  const handleClick = (e) => {
    isAuthenticated
      ? window.location.href = `${LOGIN_URL}/logout`
      : window.location.href = LOGIN_URL
  }

  return (
    <main className="main-centered">
      {
        isLoading
          ? <Loading />
          : (
              <>
                {isAuthenticated ? <Authenticated /> : <Unauthenticated />}
                <button className="material-btn" onClick={handleClick}>
                  {isAuthenticated ? 'Log Out' : 'Log In'}
                </button>
              </>
            )
      }
    </main>
  )
}