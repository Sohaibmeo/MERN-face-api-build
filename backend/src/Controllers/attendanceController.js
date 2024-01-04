import { getFirebaseDb,getFirebaseAdmin } from "../Services/firebase.js";

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

const getAttendanceByDate = async(date) => {
    try {
        const db= getFirebaseDb();
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

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}:${date}:${year}`;
  }

const setAttendance = async(userId,date) => {
    try {
        const db = getFirebaseDb();
        const admin = getFirebaseAdmin();
        const attendanceRef = db.collection("attendance").doc(date);
        const userAttendanceRef = db.collection("userAttendance").doc(userId);
        await attendanceRef.update({users: admin.firestore.FieldValue.arrayUnion(userId)},{ merge: true })
        await userAttendanceRef.update({dates: admin.firestore.FieldValue.arrayUnion(date),lastDate: getDate() },{ merge: true })
        return true;
    } catch (error) {
        console.log("Failure in setting attendance ",error.message)
        return false
    }
}

export default {getAllAttendance,getAttendanceByDate,getUserAttendance,setAttendance,setUserAttendance};