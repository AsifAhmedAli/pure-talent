const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Check for the presence of the Authorization header
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  // Check that the Authorization header is in the correct format
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Authorization header is malformed' });
  }

  // Verify and decode the JWT token
  const token = parts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = {authMiddleware};
