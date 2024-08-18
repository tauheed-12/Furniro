const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(req.headers);
    const tokenStr = authHeader && authHeader.split(' ')[1];
    const token = JSON.parse(tokenStr);
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, "My_secret_key", (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;