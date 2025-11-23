import nodemailer from 'nodemailer';
import { NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from './templates';

// the transporter object using Gmail SMTP
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
})

// welcome email
export const sendEmail = async ({ email, name, intro}: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
    .replace('{{name}}', name)
    .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"SilStocks" <silstocks@silstocks.com>`,
        to: email,
        subject: 'Welcome to SilStocks - Your Market tracking toolkit is ready!',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}

// daily news summary email
export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"SilStocks News" <silstocks@silstocks.com>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from SilStocks`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};