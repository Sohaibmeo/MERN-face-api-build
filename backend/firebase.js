import admin from 'firebase-admin';
import config from './config.js'

let db;
const initializeFirebaseApp = () => {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(config.serviceAccount)
        });
        console.log("FireBase Initialized");
        db = admin.firestore();
        console.log("Database Accessed");
    } catch (error) {
        console.log("firebase.js fails to initialize APP");
    }
}

const getFirebaseDb = () => db;

export {initializeFirebaseApp,getFirebaseDb};