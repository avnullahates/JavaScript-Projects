const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });


    let info = await transporter.sendEmail(mailOptions);
    console.log(`Message sent:${info.messageId}`);
};

module.exports = sendEmail;