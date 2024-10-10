const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Extract token and verify it
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded.id;
    next(); // Pass control to the next middleware
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
