export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://client.adamgiesey.com');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization,Origin,Accept,X-Requested-With,Cache-Control,Pragma');

  if (req.method === 'OPTIONS') {
    // Respond to preflight request
    return res.status(204).end();
  }

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