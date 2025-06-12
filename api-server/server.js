const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'https://sandbox.oursite.local', // adjust for your frontend
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// 🔐 Fake auth middleware
function requireAuth(req, res, next) {
  const token = req.cookies['auth_token'];
  if (!token) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  // You could validate token here
  next();
}

// ✅ Protected route
app.get('/account', requireAuth, (req, res) => {
  res.json({ user: 'Jane Doe', email: 'jane@example.com' });
});

// 🔍 Check cookie
app.get('/login-check', (req, res) => {
  const token = req.cookies['auth_token'];
  res.json({ tokenExists: !!token });
});

// TODO: this doesn't go here

// app.post('/login', (req, res) => {
//   const dummyToken = 'sample-token-123'; // Simulate a JWT or session token

//   res.cookie('auth_token', dummyToken, {
//     httpOnly: true,
//     secure: true,              // must be true for Secure cookies (use HTTPS or localhost + mkcert)
//     sameSite: 'lax',
//     //domain: '.sandbox.oursite.local', // optional: only use if testing cross-subdomain
//     path: '/',
//     maxAge: 60 * 60 * 1000     // 1 hour
//   });

//   res.json({ message: 'Logged in', token: dummyToken });
// });

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
