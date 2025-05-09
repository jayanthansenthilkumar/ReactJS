const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if token is expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTimestamp) {
        return res.status(401).json({ 
          message: 'Authentication token expired',
          code: 'TOKEN_EXPIRED' 
        });
      }

      // Get user from the token
      const user = await User.findById(decoded.id).select('-password');
      
      // Check if user exists
      if (!user) {
        return res.status(401).json({ 
          message: 'User belonging to this token no longer exists',
          code: 'USER_NOT_FOUND'
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      console.error('Authentication error:', error.message);
      
      // Provide specific error message for token verification failures
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          message: 'Invalid token. Please log in again.',
          code: 'INVALID_TOKEN'
        });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Your session has expired. Please log in again.',
          code: 'TOKEN_EXPIRED'
        });
      }
      
      return res.status(401).json({ 
        message: 'Not authorized, token failed',
        code: 'AUTH_FAILED'
      });
    }
  } else if (req.cookies && req.cookies.token) {
    // Alternative: try to get token from cookies if not in header
    try {
      token = req.cookies.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Cookie auth error:', error.message);
      return res.status(401).json({ 
        message: 'Not authorized, cookie token failed',
        code: 'COOKIE_AUTH_FAILED'
      });
    }
  }

  if (!token) {
    return res.status(401).json({ 
      message: 'Not authorized, no token provided',
      code: 'NO_TOKEN'
    });
  }
};

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.role === 'admin' || req.user.role === 'superAdmin')) {
    next();
  } else {
    return res.status(403).json({ 
      message: 'Not authorized as an admin',
      code: 'NOT_ADMIN'
    });
  }
};

// SuperAdmin middleware
const superAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'superAdmin') {
    next();
  } else {
    return res.status(403).json({ 
      message: 'Not authorized as a super admin',
      code: 'NOT_SUPER_ADMIN'
    });
  }
};

module.exports = { protect, admin, superAdmin };