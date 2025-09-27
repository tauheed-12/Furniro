import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, "My_secret_key", (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;
