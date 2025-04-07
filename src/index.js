import cookieParser from 'cookie-parser';
import express from 'express';
import 'dotenv/config'
import connectDB from './config/configDb.js';   // here in 

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', (req, res)=> {res.send('welcome')});


app.get('/');

connectDB()
    .then( ()=> {
        app.listen(process.env.PORT,
            ()=> console.log(`Server is successfully listening on port ${process.env.PORT}`)
        );
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    })

