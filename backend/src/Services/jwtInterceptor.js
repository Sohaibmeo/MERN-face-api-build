import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const getnewToken = async(email) => {
    try {
        const user = email;
        const token = jwt.sign({user},process.env.SECRET_JWT_TOKEN,{ expiresIn: 200 })
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
        console.log("verification failed ",error)
        return false
    }
}

export default {getnewToken,verifyRequest}