import nodemailer from "nodemailer";
import crypto from "crypto-js";

export default async function handler(req, res) {
  const { message, key, email, mobile_number } = req.body;

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // encrypt plain text using DES algorithm
  const encryptedMessage = crypto.DES.encrypt(message, key).toString();

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Secret Organization 👻" <admin@secret.com>', // sender address
    to: email, // list of receivers
    subject: "Secret Message", // Subject line
    text: encryptedMessage, // plain text body
    html: `<b>${encryptedMessage}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  res.status(200).json({ message: encryptedMessage });
}
