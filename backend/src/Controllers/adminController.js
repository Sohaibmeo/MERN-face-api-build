import { getFirebaseDb,getFirebaseAdmin } from '../Services/firebase.js'
import jwtInterceptor from '../Services/jwtInterceptor.js'
import bcrypt from 'bcrypt'

const Login = async(creds) => {
    try {
        const decodedCreds = Buffer.from(creds, 'base64').toString('ascii');
        const [username,password] = decodedCreds.split(":");
        const isAdmin = await verifyAdminEmailPassword(username,password);
        if (isAdmin) {
            const token = await jwtInterceptor.getnewToken(username);
            console.log("token : ",token)
            return token;
        }else {
            return null;
        }
    } catch (error) {
        console.log("We got problems during Login in admin : ",error)
        return null;
    }
}

const verifyAdminEmailPassword = async(username,password) => {
    try {
        const db = getFirebaseDb()
        const adminRef = db.collection('admin').doc(username);
        const doc = await adminRef.get();
        if (!doc.exists) {
            console.log('No such Admin!');
            return false;
        } else {
            if (username === doc.data().email && await bcrypt.compare(password, doc.data().password)){
                return true
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log("Error : ",error)
        return null;
    }
}

const verifyToken = async(token) => {
    try {
        const verify = jwtInterceptor.verifyRequest(token);
        return verify ? true :false
    } catch (error) {
        console.log("failed : ",error)
    }
}

const createAdmin = async(adminId,adminBody) => {
    try {
        const saltRounds = 10;
        const db = getFirebaseDb()
        const adminRef = db.collection('admin').doc(`${adminId}`);
        await adminRef.set({...adminBody,password:await bcrypt.hash(adminBody.password,saltRounds)});
        console.log("Succesfully Created Admin User : ", adminBody.name)
        return adminBody.name;
    } catch (error) {
        console.log("Could Not Create Admin : ",error)
        return null;
    }
}

const sendMessage = async(message,number) =>{
    console.log(message," to number : ",number)
    return message;
}

export default {verifyAdminEmailPassword,createAdmin,Login,verifyToken,sendMessage};