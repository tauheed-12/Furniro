const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./router/userRouter');
const shopRouter = require('./router/shopRouter');
const authRouter = require('./router/authRouter');

const app = express();

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
app.use('/product', shopRouter);
app.use('/auth', authRouter);



app.listen(8080, () => {
    console.log("Listening on port 8080");
})