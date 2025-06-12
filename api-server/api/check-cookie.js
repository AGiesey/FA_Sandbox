export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://client.adamgiesey.com');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { auth_token } = req.cookies || {};

  if (auth_token === 'authenticated') {
   return res.status(200).json({
    id: 'user-123',
    name: 'Alice Testington',
    email: 'alice@example.com'
  });
  } else {
    return res.status(401).json({ error: 'Not authenticated' });
  }
}