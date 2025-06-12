import './App.css';
import { useState, useEffect } from 'react';

const LOGIN_URL = process.env.REACT_APP_LOGIN_URL || 'https://auth.adamgiesey.com';

function Authenticated() {
  return (
    <div>
      <h2>Welcome! You are authenticated.</h2>
      <p>This is the authenticated content.</p>
    </div>
  );
}

function Unauthenticated() {
  return (
    <div>
      <h2>Please log in</h2>
      <p>You need to authenticate to access the content.</p>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    authenticate();
  }, [])

  const handleClick = (e) => {
    isAuthenticated
      ? window.location.href = `${LOGIN_URL}/logout`
      : window.location.href = LOGIN_URL
  }

  return (
    <div className="App">
      <header className="App-header">
        
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        {
          isLoading
            ? <h1>loading...</h1>
            : (
                <>
                  <button onClick={handleClick}>
                    {isAuthenticated ? 'Log Out' : 'Log In'}
                  </button>
                  {isAuthenticated ? <Authenticated /> : <Unauthenticated />}
                </>
              )
            
        }
      </main>
    </div>
  );
}

export default App;
