
//middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

const authorize = (requiredRole) => (req, res, next) => {
  const userRole = req.user.role; // Assuming role is included in the JWT payload

  if (userRole !== requiredRole) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};

module.exports = { authenticateToken, authorize };
