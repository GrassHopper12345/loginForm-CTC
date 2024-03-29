require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_SECRET; 

module.exports.createSecretToken = (id) => {
    return jwt.sign({ data: id }, secret, { expiresIn: '2d' });
};