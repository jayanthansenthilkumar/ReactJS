// Authentication middleware for JSON Server
module.exports = (req, res, next) => {
  // Set CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Authentication bypass for login and register endpoints
  if (req.url === '/auth/login' || req.url === '/auth/register' || req.method === 'GET') {
    return next();
  }

  // Normally we'd check for a JWT token here, but for simplicity we'll skip that
  // In a real app, you'd verify the token and extract the user information

  next();
};
