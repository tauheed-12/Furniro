const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Extract token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get token part from 'Bearer <token>'

    if (!token) {
        return res.sendStatus(401); // If no token is found, send 401 (Unauthorized)
    }

    // Verify the token
    jwt.verify(token, "My_secret_key", (err, user) => {
        if (err) {
            return res.sendStatus(403); // If token is invalid or expired, send 403 (Forbidden)
        }
        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
