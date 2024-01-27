const jwt = require('jsonwebtoken');
const User = require('../models/User');


const protect = async (req, res, next) => {
    let token;
    try {
        token = req.cookies.authToken;

        const decoded = jwt.verify(token, process.env.SECRET_SECRET_TOKEN);

        req.user = await User.findById(decoded).select("-password");

        next();
    } catch (err) {
        console.errlogor(err);
        res.status(401);
        throw new Error("Not AUTHORIZED");
    }

    if (!token) {
        res.status(401);
        throw new Error("Not AUTHORIZED, no token");
    }
};

module.exports = { protect };