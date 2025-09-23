const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const connection = mongoose.connection;

        connection.on('connected', () => {
        });

        connection.on('error', (error) => {
            process.exit(1);
        });

    } catch (error) {
        process.exit(1);
    }
};

module.exports = connect;
