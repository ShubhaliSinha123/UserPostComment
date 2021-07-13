const jwt = require('jsonwebtoken');
config = require('../config/auth');

exports.verify = async(req, res, next) => {
    try {
        var token = req.headers['x-access-token'];

        if(token) {
            jwt.verify(token, config.secretKey, {
                algorithm: 'HS256'
            }, function (err, decoded) {
                if(err) {
                    let errorData = {
                        message: err.message,
                        expiredAt: err.expiredAt
                    };
                    return res.status(401).send({message: "Unauthorized Access"});
                }
                req.decoded = decoded;
                console.log(decoded);
                next();
            });
        } else {
            return res.status(403).send({message: "Forbidden Access"});
        }
    } catch (error) {
        next(error);
    }
}