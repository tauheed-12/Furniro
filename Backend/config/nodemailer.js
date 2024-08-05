const nodemailer = require('nodemailer');
const dotenv = require('dotenv')

const sendMail = (mail, otp) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USERNAME,
            pass: process.env.PASSWORD
        },
    });

    const mailOptions = {
        from: 'sheikhtauheed75@gmail.com',
        to: mail,
        subject: 'Verify Our Email',
        text: `Otp is:${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200);
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200)
    });

}

module.exports = sendMail;