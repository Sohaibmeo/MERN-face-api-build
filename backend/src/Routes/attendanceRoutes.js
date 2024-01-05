import express from "express";
import attendanceController from "../Controllers/attendanceController.js";
const router = express.Router();

router.post('/addRecord', async(req,res)=>{
    try {
        console.log("We are logging attendance whew!!",req.body);
        await attendanceController.setAttendance(req.body.userId)
        const response = await attendanceController.getAttendanceToday()
        console.log("Sending data of all Attendance to frontend now");
        res.send(response)
    } catch (error) {
        console,log("Issue during api call",error)
    }
})

router.get('/get-record-today', async(req,res)=>{
    try {
        const response = await attendanceController.getAttendanceToday()
        console.log("Sending attendance record of Today's Date");
        res.send(response)
    } catch (error) {
        console,log("Issue during api call",error)
    }
}) 

export default router;