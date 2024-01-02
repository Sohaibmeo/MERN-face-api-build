import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import config from '../../config.js'
dotenv.config();

const getnewToken = async(email) => {
    try {
        const user = email;
        const token = jwt.sign({user},config.jwtConfig.token,{ expiresIn: 20 })
        return token
    } catch (error) {
        console.log("Problems with token generation",error)
        return null
    }
}

const verifyRequest = (token) => {
    try {
        const decode = jwt.verify(token,process.env.SECRET_JWT_TOKEN);
        return decode;
    } catch (error) {
        console.log("verification failed",error.message)
        return false
    }
}

export default {getnewToken,verifyRequest}