import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';

import userRouter from './router/userRouter.js';
import shopRouter from './router/shopRouter.js';
import authRouter from './router/authRouter.js';


const app = express();

app.use(cors());
app.use(express.json());


app.use('/user', userRouter);
app.use('/product', shopRouter);
app.use('/auth', authRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {

});