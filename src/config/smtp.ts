import dotenv from 'dotenv';
dotenv.config();

export const smtpConfig = {
    host: process.env.SMTP_HOST || "",
    port:  Number(process.env.SMTP_PORT) || 0,
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASS,
    },
  };