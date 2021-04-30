const sgMail = require('@sendgrid/mail')
const config = require('../config')

const sendMail = (next, email, subject, text, message) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email, // Change to your recipient
            from: 'noreply.mytelegram@gery.me', // Change to your verified sender
            subject: subject,
            text: text,
            html: message
        }
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent')
            })
            .catch((error) => {
                console.error(error)
            })
        return next()
    } catch (error) {
        return next(error)
    }
};

const mailCreateAccount = (next, email, activationKey) => {
    return sendMail(next, email,'MyTelegram confirm account', 'Click here to activate', `<div><h1>Hello new user!</h1><p>Click <a href="${config.hostname}/api/auth/confirm?key=${activationKey}">link</a> to activate your new account.</p></div><div><h1>Hello developer!</h1><p>Feel free to change this template ;).</p></div>`)
};

const mailLogin = (next, email) => {
    console.log(email)
    return sendMail(next, email, 'MyTelegram login notification', 'Click here to see infos', `<div><h1>Hello user!</h1><p>A new connection was established </p></div>`)
};

exports.mailCreateAccount = mailCreateAccount;
exports.mailLogin = mailLogin;