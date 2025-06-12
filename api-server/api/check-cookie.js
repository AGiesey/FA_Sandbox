export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // In real life, you'd read the cookie and verify the token
  res.status(200).json({
    id: 'user-123',
    name: 'Alice Testington',
    email: 'alice@example.com'
  });
}