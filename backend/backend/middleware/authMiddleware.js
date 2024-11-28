// Ensures that only authenticated users can access certain routes (like creating or updating shipments).

const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"
        if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;  // Attach user info to request object

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Access denied' });
            }
            
            next();
      } catch (err) {
            res.status(400).json({ message: 'Invalid token.' });
      }
  };
};

module.exports = auth;
