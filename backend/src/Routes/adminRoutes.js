import express from 'express'
import adminController from '../Controllers/adminController.js'
const router = express.Router();

router.post('/create',async(req,res)=>{
    await adminController.createAdmin(req.body.email,req.body)
    res.status(200).json({message: "Admin Created Succesfully"})
});

router.get('/verify/:id',async(req,res)=>{
    const response = await adminController.verifyAdmin(req.params.id)
    res.send(response)
});

router.post('/create-token',async(req,res)=>{
    console.log("token created ---> ",req.body)
    res.send({backendToken:"abc123"})
});

router.post('/verify-token',async(req,res)=>{
    const response = await adminController.getToken();
    console.log("Got this request ---> ", req.body)
    if(req.body.assignedToken === response){
        res.send(true)
    }else{
        res.send(false)
    }
});

export default router;