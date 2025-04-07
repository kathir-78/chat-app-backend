import cookieParser from 'cookie-parser';
import express from 'express';
import 'dotenv/config'


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', (req, res)=> {res.send('welcome')});


app.get('/');


app.listen(process.env.PORT,
    ()=> console.log(`Server is successfully listening on port ${process.env.PORT}`)
)
