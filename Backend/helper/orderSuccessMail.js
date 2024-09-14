const nodemailer = require('nodemailer');

const successMail = async (email, productName) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sheikhtauheed75@gmail.com',
            pass: 'ledq golo ptkw asep'
        },
    });

    transporter.sendMail({
        from: 'sheikhtauheed75@gmail.com',
        to: email,
        subject: 'Order Placed Successfully',
        text: `Congratulations your order of ${productName} is successfully placed`,
    })

}

module.exports = successMail;