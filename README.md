# Chat Application Server

This is the backend server for a real-time chat application built using **Node.js**, **Express**, **Socket.IO**, and **MongoDB**. The server handles user authentication, chat management, and real-time messaging.

---
## Deployment

The server is deployed on EC2 instance:

try : [Chat Application Server Deployment](http://16.171.224.207)
## Features

- **User Authentication**:
  - Login, Sign-up, and Logout functionality.
  - Middleware to protect routes and ensure authenticated access.

- **Real-Time Messaging**:
  - WebSocket integration using **Socket.IO** for real-time communication.
  - Users can send and receive messages instantly.

- **Chat Management**:
  - Create and manage chat rooms between users.
  - Store chat history in MongoDB.

- **AWS S3 Integration**:
  - Generate pre-signed URLs for secure file uploads.
  - Store user profile image URLs in the database.

---

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **Socket.IO**: Real-time communication between clients and server.
- **MongoDB**: NoSQL database for storing user and chat data.
- **Mongoose**: ODM for MongoDB.
- **AWS S3**: For file storage.

