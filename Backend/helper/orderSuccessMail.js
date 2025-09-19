require('dotenv').config();
const nodemailer = require('nodemailer');

const successMail = async (email, productName) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sheikhtauheed75@gmail.com',
            pass: process.env.PASSWORD,
        },
    });

    await transporter.sendMail({
        from: '"Furniro Store 🛋️" <sheikhtauheed75@gmail.com>',
        to: email,
        subject: `🎉 Order Confirmed: ${productName}`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333; max-width:600px; margin:auto; border:1px solid #eee; padding:20px; border-radius:10px;">
                <h2 style="color:#4CAF50; text-align:center;">✅ Congratulations!</h2>
                <p>Dear Customer,</p>
                <p>We’re excited to let you know that your order for <strong style="color:#2C3E50;">${productName}</strong> has been placed successfully! 🎁</p>
                <p>Here’s what happens next:</p>
                <ul>
                    <li>📦 We’ll prepare your product for shipping.</li>
                    <li>🚚 You’ll receive a tracking email once it’s on the way.</li>
                    <li>🤝 Our support team is here if you have any questions.</li>
                </ul>
                <p style="margin-top:15px;">Thank you for shopping with <strong>Furniro</strong>. We hope your new purchase brings joy to your space!</p>
                
                <hr style="margin:20px 0;">
                <p style="font-size:14px; color:#555; text-align:center;">
                    If you have any queries, feel free to reply to this email.<br>
                    ❤️ Team Furniro
                </p>
            </div>
        `,
    });
};

module.exports = successMail;
