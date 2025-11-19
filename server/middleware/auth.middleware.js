import jwt from 'jsonwebtoken';

/**
 * Middleware to verify JWT tokens and authenticate requests
 * Extracts token from Authorization header, verifies it, and attaches userId to request
 */
export const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid token.',
      });
    }

    // Get token after "Bearer "
    const token = authHeader.substring(7);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid token.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.user = { _id: decoded.userId, email: decoded.email };

    next();
  } catch (error) {
    // Handle token validation errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please authenticate again.',
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.',
      });
    }

    // Generic error
    return res.status(401).json({
      success: false,
      message: 'Authentication failed.',
    });
  }
};
