const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) {
        return res.status(400).json({ message: 'No Token Provided, Denied Access' });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid Token' })
    }
}

module.exports = authMiddleware;