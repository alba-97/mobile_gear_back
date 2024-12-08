import nodemailer from "nodemailer";

const sendEmail = async (to: string, subject: string, text: string) => {
  const domain = process.env.EMAIL_USER?.split("@")[1];
  const service = domain?.split(".")[0].toLowerCase();

  const transporterOptions = {
    service,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };
  const transporter = nodemailer.createTransport(transporterOptions);

  await transporter.sendMail(mailOptions);
};

export default { sendEmail };
