
//Code I tested the firebase library with on backend
import { initializeApp } from 'firebase/app';
import config from '../../config.js';

let app;
const initializeFirebaseApp = () => {
    try {
        app = initializeApp(config.firebaseConfig);
        console.log("Client -> FireBase Initialized");
    } catch (error) {
        console.log("firebase.js fails to initialize APP",error);
    }
}

const getFirebaseApp = () => app;

export {initializeFirebaseApp,getFirebaseApp};

//let db = getFirestore(getFirebaseApp());
//routes models controllers role here
// app.get('/users', async(req , res) => {
//     const userRef = collection(db, "users");
//     console.log("Users Retreived?");
//     const response = await getDocs(userRef);
//     console.log("Snapshot received");
//     let responseArr = [];
//     response.docs.map(doc => {responseArr.push(doc.data())});
//     console.log("Data Extracted");
//     res.send(responseArr)
// });