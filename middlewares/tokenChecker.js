const jwt = require('jsonwebtoken');
const { secret } = require('./../configs/config');

const tokenChecker = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(400).send({
            success: false,
            message: "Token de autorización faltante"
        })
    }

    if (token.includes('Bearer ')) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, secret, (error, decoded) => {
        if (error) {
            return res.status(400).send({
                success: false,
                message: "Token inválido"
            });
        } else {
            req.body.username = decoded.username;
            next();
        }
    });
}

module.exports = tokenChecker;