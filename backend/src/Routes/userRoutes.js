import express from 'express';
import userController from '../Controllers/userController.js';
const router = express.Router()

router.get('/', async(req, res) => {
    const response = await userController.getAllUser();
    res.send(response);
});

router.get('/singleUser', async(req, res) => {
    const response = await userController.getUserById(req.body.id);
    res.send(response);
});

router.post('/createUser', async(req, res) => {
    //TODO: add image and descriptor to a seperate dbCollection ok?
    const latestId = await userController.assignUserId()
    console.log("Id to be given to user = ", latestId)
    const response = await userController.createUser(latestId,req.body)
    res.send({"id":response});
});

router.post('/updateUser/:id', async(req, res) => {
    await userController.updateUser(req.params.id,req.body)
    res.status(200).json({message: "User Updated Succesfully"})
});

router.post('/deleteUser/:id', async(req, res) => {
    try {
        await userController.deleteUser(req.params.id)
        res.status(200).json({message: "User Deleted Succesfully"})
    } catch (error) {
        console.log("Failed to delete user ----> ",error);
        res.send(error);
    }
});

export default router;