const { JWT_SECRET } = require('../config');
const jwt = require('jsonwebtoken');

class JwtService {
    static sign(payload, secret = JWT_SECRET, expiry= '1d'){

        return jwt.sign(payload, secret, {expiresIn: expiry } )

    }
    static verify(token,secret = JWT_SECRET){

        return jwt.verify(token, secret);

    }
}

export default JwtService;
// module.exports = JwtService;