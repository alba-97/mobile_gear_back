import emailRepository from "../repositories/email.repository";

const sendPurchaseEmail = async (
  products: string,
  eta: Date,
  email: string
) => {
  const to = email;
  const subject = "Thanks for your purchase!";
  const text = `You bought ${products}\n\nIt arrives ${eta}`;

  await emailRepository.sendEmail(to, subject, text);
};

export default { sendPurchaseEmail };
