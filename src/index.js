import cookieParser from 'cookie-parser';
import express from 'express';
import 'dotenv/config'
import connectDB from './config/configDb.js';  
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js'
import cors from 'cors'
import awsRouter from './routes/awsRoute.js';
import { createServer } from 'http';
import initializeSocket from './utils/webSocket.js';
import chatRoute from './routes/chatRoute.js';

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/', authRoute);
app.use('/', userRoute);
app.use('/', awsRouter);
app.use('/', chatRoute)

const server = createServer(app);
initializeSocket(server)


connectDB()
    .then( ()=> {
        server.listen(process.env.PORT,
            ()=> console.log(`Server is successfully listening on port ${process.env.PORT}`)
        );
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    })

