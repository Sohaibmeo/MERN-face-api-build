import express from "express";
import attendanceController from "../Controllers/attendanceController.js";
const router = express.Router();

router.post('/addRecord', async(req,res)=>{
    try {
        console.log("We are logging attendance whew!!",req.body);
        await attendanceController.setAttendance(req.body.userId,req.body.date)
        const response = await attendanceController.getAttendanceByDate(req.body.date)
        console.log("Sending data of all Attendance to frontend now");
        res.send(response)
    } catch (error) {
        console,log("Issue during api call",error)
    }
}) 

export default router;