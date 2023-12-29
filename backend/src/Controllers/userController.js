import { getFirebaseDb,getFirebaseAdmin } from "../Services/firebase.js";

//checked and tested
async function getUserById(id) {
    try {
        const db = getFirebaseDb();
        const docRef = db.collection("users");
        const response = await docRef.doc(id).get();
        console.log("Successfully retreived a single user ", response.data());
        return response.data();
    } catch (error) {
        console.log("Error Fetching single user ------> ",error);
        return null;
    }
}
// checked and tested
async function getAllUser() {
    try {
        const db = getFirebaseDb();
        const docRef = db.collection("users");
        const response = await docRef.get();
        let responseArr = [];
        response.forEach(doc => {
           responseArr.push(doc.data());
        });
        console.log("Successfully got all users Length = ", responseArr.length);
        return responseArr;
    } catch (error) {
        console.log("Error Fetching All users ------> ",error);
        return null;
    }
}

// checked and tested
async function createUser(userId,userBody){
    try {
        const db = getFirebaseDb();
        const docRef = db.collection("users");
        await docRef.doc(`${userId}`).set(userBody);
        console.log("User added successfully with ID : ",userId);
        return userId;
    } catch (error) {
        console.log("Could not Create user ----> ",error);
        return null;
    }
}
// checked and
async function deleteUser(userId) {
    try {
        const db = getFirebaseDb();
        const docRef = db.collection("users");
        await docRef.doc(userId).delete();
        console.log("User Deleted Succesfully");
        return 1;
    } catch (error) {
        console.log("Failed to delete user ----> ",error);
        return null;
    }
}
//checked and 
async function updateUser(userId, userBody) {
    try {
        const db = getFirebaseDb();
        const docRef = db.collection("users");
        const response = docRef.doc(userId).update(userBody);
        console.log("Updated user : ", userId);
        return 1;
    } catch (error) {
        console.log("Failed to update user ----> ",error);
        return null;
    }
}
//not implemented yet
async function getUserListByName(userName) {
    //Implement this function
    console.log("Current version of Fitness Does not support this feature");
    return null;
}
//tested
async function assignUserId (){
    const db = getFirebaseDb();
    const admin = getFirebaseAdmin();
    console.log("---Using Admin Functions----");
    const counterRef = db.collection('counter').doc('user-tracker');
    try {
        await counterRef.set(
            {id: admin.firestore.FieldValue.increment(1)},
            { merge: true }
        );
        const doc = await counterRef.get();
        const updatedId = doc.data().id;
        return updatedId
    } catch (error) {
        console.error('Error getting and incrementing counter:', error);
        return null;
    }
}

export default {
    getUserById,
    getAllUser,
    createUser,
    deleteUser,
    updateUser,
    getUserListByName,
    assignUserId
};



