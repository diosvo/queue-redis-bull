import nodemailer from "nodemailer";

const email_process = async (job) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  return nodemailer.getTestMessageUrl(await transporter.sendMail(job.data));
};

module.exports = email_process;
