const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'nodemailer17@gmail.com',
        pass: 'GeraNodemailer17'
    }
});
module.exports = transporter;