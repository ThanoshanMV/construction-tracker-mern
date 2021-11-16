const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * Validate and decode the token
 */
module.exports = function (req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    //401 = Not Authorized
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  // Verify the token
  try {
    //Decode the token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    // get value from the token
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
