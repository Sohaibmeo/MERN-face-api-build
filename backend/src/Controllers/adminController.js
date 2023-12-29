import { getFirebaseDb,getFirebaseAdmin } from '../Services/firebase.js'

const verifyAdmin = async(userId) => {
    try {
        const db = getFirebaseDb()
        const adminRef = db.collection('admin').doc(userId);
        const doc = await adminRef.get();
        if (!doc.exists) {
            console.log('No such Admin!');
            return null
        } else {
            console.log('Admin Verified As : ',doc.data().name);
            return doc.data();
        }
    } catch (error) {
        console.log("Could Not Verify Admin : ",error)
        return null;
    }
}

const createAdmin = async(adminId,adminBody) => {
    try {
        const db = getFirebaseDb()
        const adminRef = db.collection('admin').doc(`${adminId}`);
        const doc = await adminRef.set(adminBody);
        console.log("Succesfully Created Admin User : ", adminId.name)
        return adminBody.name;
    } catch (error) {
        console.log("Could Not Create Admin : ",error)
        return null;
    }
}

const getToken = async() => {
    return "abc123"
}

export default {verifyAdmin,createAdmin, getToken};