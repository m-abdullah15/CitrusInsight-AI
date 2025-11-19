/**
 * Validation middleware for request data
 */

/**
 * Validate signup request data
 */
export const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;

  // Check required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required',
      errors: {
        name: !name ? 'Name is required' : undefined,
        email: !email ? 'Email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      },
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Invalid email format',
      errors: { email: 'Please provide a valid email address' },
    });
  }

  // Validate password strength (minimum 6 characters)
  if (password.length < 6) {
    return res.status(400).json({
      message: 'Password too weak',
      errors: { password: 'Password must be at least 6 characters long' },
    });
  }

  next();
};

/**
 * Validate login request data
 */
export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  // Check required fields
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required',
      errors: {
        email: !email ? 'Email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      },
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Invalid email format',
      errors: { email: 'Please provide a valid email address' },
    });
  }

  next();
};
