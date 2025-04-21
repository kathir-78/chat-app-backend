here in the ES6 module
 - import the js module with the extension **.js**  './config/configDb.js' but not for common js module

 once the database is connected then only the server will start

**Routes** => user
 - /auth/login
 - /auth/signUp 
 - /auth/logout 

 - /user => getall the users

 - api level validation
 - schema level validation

 **aws pre-signedUrl**
 - generate pre-signedUrl
 - send it to the fronted
 - once the fronted upload the object (image) to S3, send the URL to the server and the and the server store the URL in the database to the specified person


### WebSocket
**Socket.IO**
- Create an HTTP server.
- Add the Express app to the HTTP server to handle Express routes.
- Integrate WebSocket (Socket.IO) into the HTTP server to handle real-time communication.
- Create the Socket.IO server.
- Use events to emit and listen for messages in Socket.IO.


### Chat Schema
- chatschema with two fields where participants will be array of user with objectId and messages array of message object.
- message will have two fields senderId it contains object_id and the text message sended by that user.
- By the schema design we can easily scale-up the users and separate the message schema.
