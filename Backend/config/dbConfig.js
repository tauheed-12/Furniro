const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MONGODB connected');
        });

        connection.on('error', (error) => {
            console.error('Mongodb connection error, please make sure db is up and running: ' + error);
            process.exit(1);
        });

    } catch (error) {
        console.error("Something went wrong in connecting to DB", error);
        process.exit(1);
    }
};

module.exports = connect;
