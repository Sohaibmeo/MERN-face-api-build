import express from 'express';
import cors from 'cors';
import { initializeFirebaseApp } from './src/Services/firebase.js';
import userRoutes from './src/Routes/userRoutes.js';
import dotenv from 'dotenv';
// Initialize app
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//To be implemented later on : session token and admin email/unqie:ID

//Initiaalize firebase
initializeFirebaseApp()

//routes and controllers
app.use('/users', userRoutes)


app.listen(process.env.PORT || 8080,()=> console.log("Server is running on port 8080"));
//Can check from api if everything is good
app.get('/', (req, res) => {
    res.send('Hello, world!');
});