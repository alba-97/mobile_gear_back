import transporter from "../mailTransporter";

const sendPurchaseEmail = async (
  products: string,
  eta: Date,
  email?: string
) => {
  const to = email;
  const subject = "Thanks for your purchase!";
  const text = `You bought ${products}\n\nIt arrives ${eta}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

export default { sendPurchaseEmail };
