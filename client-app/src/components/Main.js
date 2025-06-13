'use client';
import { useState, useEffect } from 'react';
import { Authenticated } from './Authenticated';
import { Unauthenticated } from './Unauthenticated';
import { Loading } from './Loading';
import './Main.css';
import axios from 'axios';

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL || 'https://auth.adamgiesey.com';
const USE_AXIOS = true;

export function Main() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    USE_AXIOS ? checkCookieWithAxios() : checkCookie();
  }, [])
  
  const checkCookie = async () => {
    console.log("CHECKING COOKIE WITH FETCH")
    setIsLoading(true);
    try {
      const response = await fetch('https://api.adamgiesey.com/api/check-cookie', {
        credentials: 'include',
        headers: {
          'Origin': window.location.origin,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        },
        cache: 'no-store'
      });
      setIsAuthenticated(response.status === 200);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }

  // Axios version of authenticate
  const checkCookieWithAxios = async () => {
    console.log("CHECKING COOKIE WITH AXIOS")
    setIsLoading(true);
    try {
      const response = await axios.get('https://api.adamgiesey.com/api/check-cookie', {
        withCredentials: true,
        headers: {
          'Origin': window.location.origin,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
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