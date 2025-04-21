import express from 'express'
import isAuthenticated from '../middleware/auth.js';
import Chat from '../models/chatModel.js';

const chatRoute = express.Router();

chatRoute.get('/getChat/:toUserId', isAuthenticated, async(req, res) => {

    const fromUserId = req.user._id;
    const { toUserId }= req.params

    try {
        let chat = await Chat.findOne({ participants: { $all : [fromUserId, toUserId]}})
        .populate({
            path:"messages.senderId",
            select: "firstName"
        });
        if(!chat) {
           chat = await Chat.create({
                participants: [fromUserId, toUserId],
                messages: []
           });
        }

        res.status(200).json(chat);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}); 

export default chatRoute; 
