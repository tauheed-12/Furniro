const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./router/userRouter');
const shopRouter = require('./router/shopRouter');
const multer = require('multer')
const { Resend } = require('resend');
const sendMail = require('./config/nodemailer')

const app = express();
const resend = new Resend('re_WdqjcsWu_KR77TnJJgwmXMPJrPkpqndd9');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/furniro', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', function () {
    console.log('Error while connecting with database')
});

db.once('open', function () {
    console.log('Connected to MongoDB')
})

app.use('/user', userRouter);
app.use('/product', shopRouter)

app.listen(8080, () => {
    console.log("Listening on port 8080");
})