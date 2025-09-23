const express = require('express');
require('dotenv').config()

const cors = require('cors');
const connect = require('./config/dbConfig');

const userRouter = require('./router/userRouter');
const shopRouter = require('./router/shopRouter');
const authRouter = require('./router/authRouter');


const app = express();

app.use(cors());
app.use(express.json());

connect();


app.use('/user', userRouter);
app.use('/product', shopRouter);
app.use('/auth', authRouter);



const PORT = process.env.PORT;
app.listen(PORT, () => {

});