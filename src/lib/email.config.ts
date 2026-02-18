import nodemailer from 'nodemailer'

export const getNodemailerTransport = () => {
  return nodemailer.createTransport({
    host: 'next-smtp.useplunk.com',
    port: 2587,
    secure: false,
    auth: {
      user: 'plunk',
      pass: process.env.SMTP_PASSWORD,
    },
  })
}
