const jwt = require('jsonwebtoken');
const refreshModel = require('../models/refresh-model');
const accessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET
const refreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET
class TokenService{
    createToken(payload){
        const accessToken = jwt.sign(payload,accessTokenSecret,{
            expiresIn: '1h'
        });
        const refreshToken = jwt.sign(payload,refreshTokenSecret,{
            expiresIn: '1m'
        });
        return {accessToken,refreshToken}
    }

    async storeRefreshToken(refreshToken, userId){
        return await refreshModel.create({token: refreshToken, userId});
    }

    async deleteRefreshToken(refreshToken){
        return await refreshModel.deleteOne({token: refreshToken});
    }
}
module.exports = new TokenService();