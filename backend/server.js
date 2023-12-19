import express, { response } from 'express';
import cors from 'cors';
import { getFirebaseDb, initializeFirebaseApp } from './firebase.js';
import dotenv from 'dotenv';
// Initialize app
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Initiaalize firebase
initializeFirebaseApp()
let db = getFirebaseDb();
//routes models controllers role here

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

app.post('/create', async(req, res) =>{
    try {
        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
        };
        // const response = await db.collection("users").add(userJson);
        const dockRef = db.collection("users").doc(id)
        await dockRef.set(userJson);
        console.log("User added", id);
        res.status(200).json({message: "User Created Succesfully"})
    } catch (error) {
        res.send(error);
    }
});

app.get('/retreiveall', async(req, res) =>{
    try {
        const usersRef = db.collection("users");
        const response = await usersRef.get();
        let responseArr = [];
        response.forEach(doc => {
           responseArr.push(doc.data());
        });
        if(responseArr.length > 0)
           { console.log("User", responseArr)}
        else
           { console.log("No response") }
        res.send(responseArr);
    } catch (error) {
        res.send(error);
    }
});

app.get('/one/:id', async(req, res) =>{
    try {
        const usersRef = db.collection("users").doc(req.params.id);
        const response = await usersRef.get();
        if(response)
           { console.log("User", response.data())}
        else
           { console.log("No response") }
        res.send(response.data());
    } catch (error) {
        res.send(error);
    }
});

app.get('/update', async(req, res) =>{
    try {
        const id = req.body.email;
        const jsonBody = {
            school: "BFIS",
            goesToSchool: false
        }
        const userRef = db.collection("users").doc(id);
        await userRef.update(
            jsonBody
        )
        res.send('Success');
    } catch (error) {
        res.send(error);
    }
});

app.get('/delete', async(req, res) =>{
    try {
        const id = req.body.email;
        const userRef = db.collection("users");
        await userRef.delete()
        console.log(`User ${id} deleted succesfully`)
        res.send('Success');
    } catch (error) {
        res.send(error);
    }
});

app.listen(process.env.PORT || 8080,()=> console.log("Server is running on port 8080"));