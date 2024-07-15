import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplete.js";

export async function sendEmail(to,subject,userName='', token){

    const transporter = nodemailer.createTransport({
        service: 'gmail',

        auth: {
            user: process.env.EMAILSENDER,
            pass: process.env.EMAILPASSWORD,
        },
      });

      const info = await transporter.sendMail({
        from: `T shop" <${process.env.EMAILSENDER}>`, // sender address
        to, // list of receivers
        subject, // Subject line
        html:emailTemplate(to, userName,token), // html body
      });

      return info;

}