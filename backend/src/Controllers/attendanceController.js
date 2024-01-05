import { getFirebaseDb,getFirebaseAdmin } from "../Services/firebase.js";

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}:${date}:${year}`;
}
const getAllAttendance = async() => {
    try {
        const db= getFirebaseDb();
        const response = await db.collection("attendance").get()
        let responseArr = []
        response.forEach(doc => {
            responseArr.push({...doc.data(),id:doc.id});
         });
        return responseArr
    } catch (error) {
        console.log("Failure in getting attendance ",error.message)
        return false
    }
}

const getUserAttendance = async(userId) => {
    try {
        return true
    } catch (error) {
        return false
    }
}

const getAttendanceToday = async() => {
    try {
        const db= getFirebaseDb();
        const date = getDate()
        const response = await db.collection("attendance").doc(date).get()
        return {...response.data(),date: date}
    } catch (error) {
        console.log("Failure in getting attendance ",error.message)
        return false
    }
}

const setUserAttendance = async() => {
    try {
        return true
    } catch (error) {
        return false
    }
}



const setAttendance = async(userId) => {
    try {
        const db = getFirebaseDb();
        const admin = getFirebaseAdmin();
        const today = getDate();
        const attendanceRef = db.collection("attendance").doc(today);
        const userAttendanceRef = db.collection("userAttendance").doc(userId);
        await attendanceRef.update({users: admin.firestore.FieldValue.arrayUnion(userId)},{ merge: true })
        await userAttendanceRef.update({dates: admin.firestore.FieldValue.arrayUnion(today),lastDate: today },{ merge: true })
        return true;
    } catch (error) {
        console.log("Failure in setting attendance ",error.message)
        return false
    }
}

export default {getAllAttendance,getAttendanceToday,getUserAttendance,setAttendance,setUserAttendance};