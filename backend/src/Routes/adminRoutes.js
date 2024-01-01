import express from 'express'
import adminController from '../Controllers/adminController.js'
const router = express.Router();

router.post('/create',async(req,res)=>{
    try {
        await adminController.createAdmin(req.body.email,req.body)
        res.status(200).json({message: "Admin Created Succesfully"})
    } catch (error) {
        console.log("Error Creating Admin", error);
        //error response here
    }
});

router.get('/login',async(req,res)=>{
    try {
        const creds = req.headers.authorization.split(" ")[1];
        const token = await adminController.Login(creds);
        if(token){
            res.send({"token":token});
        } else{
            //this is random response TODO
            res.status(401).json({message: "Wrong creds ?"})
        }
    } catch (error) {
        res.status(401).json({message: error})
    }
})

router.post('/verify-token',async(req,res)=>{
    try {
        const token = req.body.token;
        const response = await adminController.verifyToken(token);
        res.send(response);
    } catch (error) {
        console.log("Error verifying",error);
        res.status(404).json({message:"Verification Failed"})
    }
})

export default router;