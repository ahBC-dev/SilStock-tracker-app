import nodemailer from 'nodemailer';
import { WELCOME_EMAIL_TEMPLATE } from './templates';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
})

export const sendEmail = async ({ email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
    .replace('{{name}}', name)
    .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"SilStocks" <aahg@ahmadaljaziri.com>`,
        to: email,
        subject: 'Welcome to SilStocks - Your Market tracking toolkit is ready!',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}