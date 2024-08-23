import nodemailer from 'nodemailer';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { to, subject, text, attachmentData, attachmentName } = await request.json();
  const emailUser = import.meta.env.VITE_EMAIL_USER
  const emailPass = import.meta.env.VITE_EMAIL_PASS
  console.log(emailPass)
  console.log(emailUser)

  let transporter = nodemailer.createTransport({
    host: 'smtp.porkbun.com',
    port: 587,
    secure: false,
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  try {
    let info = await transporter.sendMail({
      from: emailUser,
      to: to,
      subject: subject,
      text: text,
      attachments: attachmentData ? [
        {
          filename: attachmentName,
          content: Buffer.from(attachmentData, 'base64')
        }
      ] : []
    });

    return json({ message: 'Email sent successfully', id: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error);
    return json({ message: 'Error sending email', error: error.message }, { status: 500 });
  }
}