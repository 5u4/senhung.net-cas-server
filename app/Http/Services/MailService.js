const nodemailer = require('nodemailer');
const mailConfig = require('../../../configs/mail');
const ejs        = require('ejs');

const transportConfigs = process.env.NODE_ENV === 'test'
    ? {
        host: mailConfig.test.host,
        port: mailConfig.test.port,
        auth: {
            user: mailConfig.test.user,
            pass: mailConfig.test.password,
        },
    }
    : {
        service: 'gmail',
        secure: false,
        auth: {
            user: mailConfig.gmail.user,
            pass: mailConfig.gmail.password,
        },
    };

const transporter = nodemailer.createTransport(transportConfigs);

/**
 * Sent a verifying email to given email address
 * 
 * @param {String} email 
 */
const sendVerifyEmail = async (email, verificationLink) => {
    const html = await ejs.renderFile(__dirname + '/../../../resources/views/mail/emailVerification.ejs', {
        verificationLink: verificationLink,
    });

    const mailOptions = {
        from: mailConfig.gmail.from,
        to: email,
        subject: 'Welcome to senhung.net 😆',
        text: 'Please click on the link to verify your email: ' + verificationLink,
        html: html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerifyEmail,
};
