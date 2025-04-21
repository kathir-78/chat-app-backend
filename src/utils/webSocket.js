import { Server } from 'socket.io';
import Chat from '../models/chatModel.js';

const initializeSocket = (server)=> {

    const io = new Server (server,  {                  // initialize socket.io server
        cors: {
          origin: "http://localhost:5173"              //must config the CORS
        }
      })  

    io.on("connection", (socket) => {

        // handle events 

        socket.on("joinChat", ({fromUserId, toUserId}) => {             //create the room before the message begin

            const roomId = [fromUserId, toUserId].sort().join('_');
            socket.join(roomId);

        })

        socket.on("sendMessage", async ({firstName, fromUserId, toUserId, newMessage}) => {   //send the message to the room
            
            try {
                const roomId = [fromUserId, toUserId].sort().join('_');
                socket.join(roomId);

                let chat = await Chat.findOne({
                    participants: { $all : [fromUserId, toUserId]}
                });

                if(!chat) {
                    chat = new Chat({
                        participants: [ fromUserId, toUserId ],
                        messages: []
                    });
                }

                chat.messages.push({
                    senderId: fromUserId,
                    text: newMessage
                })

                await chat.save();
                io.to(roomId).emit("receiveMessage", ({firstName, newMessage, fromUserId}));

            } catch (error) {
                console.log(error);
                res.status(400).json(error);
            }

        })

        socket.on("disconnect", ()=> {})
    })
}

export default initializeSocket;