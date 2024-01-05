import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = {
    "type": process.env.TYPE,
    "project_id": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_CERT_URL,
    "universe_domain": process.env.UNIVERSE_DOMAIN
}

const firebaseConfig = {
  "apiKey": process.env.REACT_APP_FIREBASE_API_KEY,
  "authDomain": process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  "projectId": process.env.REACT_APP_FIREBASE_PROJECT_ID,
  "storageBucket": process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  "messagingSenderId": process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  "appId": process.env.REACT_APP_FIREBASE_APP_ID
};

const jwtConfig = {
    token: process.env.SECRET_JWT_TOKEN
}

const twilioConfigLive = {
  accountSid: process.env.TWILIO_ACCOUNT_ID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  number: process.env.TWILIO_NUMBER
}

const twilioTestConfig = {
  accountSid: process.env.TWILIO_TEST_ACCOUNT_ID,
  authToken: process.env.TWILIO_TEST_AUTH_TOKEN,
  number: process.env.TWILIO_NUMBER
}
export default {serviceAccount,firebaseConfig,jwtConfig,twilioConfigLive,twilioTestConfig};