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
    const subject = 'Welcome to senhung.net 😆';
    const text    = 'Please click on the link to verify your email: ' + verificationLink;
    const html    = await ejs.renderFile(__dirname + '/../../../resources/views/mail/emailVerification.ejs', {
        verificationLink: verificationLink,
    });

    await sendEmail(email, subject, text, html);
};

/**
 * Sent a verify successful email to given email address
 * 
 * @param {String} email 
 */
const sendVerifySuccessEmail = async (email) => {
    const subject = 'Thank you for registering senhung.net!';
    const text    = 'You now can freely use all apps under senhung.net. Thank you very much for registering!';
    const html    = await ejs.renderFile(__dirname + '/../../../resources/views/mail/emailValidationSuccess.ejs');

    await sendEmail(email, subject, text, html);
};

/**
 * Send an email
 * 
 * @param {String} email The email destination
 * @param {String} subject The email subject
 * @param {String} text The text format of email
 * @param {String} html The html format of email
 */
const sendEmail = async (email, subject, text, html) => {
    const mailOptions = {
        from: mailConfig.gmail.from,
        to: email,
        subject: subject,
        text: text,
        html: html,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerifyEmail,
    sendVerifySuccessEmail,
};
