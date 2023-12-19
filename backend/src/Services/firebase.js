import admin from 'firebase-admin';
import config from '../../config.js'

let db;
const initializeFirebaseApp = () => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(config.serviceAccount)
        });
        console.log("Admin -> FireBase Initialized");
        db = admin.firestore();
        console.log("Admin -> Database Accessed");
    } catch (error) {
        console.log("firebase.js fails to initialize APP");
    }
}

const getFirebaseDb = () => db;
const getFirebaseAdmin = () => admin;

export {initializeFirebaseApp,getFirebaseDb, getFirebaseAdmin};