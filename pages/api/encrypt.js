import crypto from "crypto";
import nodemailer from "nodemailer";
import axios from "axios";

function encrypt(message, key) {
  const cipher = crypto.createCipher("des", key);
  let ciphertext = cipher.update(message, "utf8", "hex");
  ciphertext += cipher.final("hex");
  return ciphertext;
}

async function sendSMS(mobile_number, key) {
  axios
    .post(
      process.env.NEXT_PUBLIC_SMS_ENDPOINT,
      {
        to: mobile_number,
        message: key,
      },
      {
        headers: { "api-key": process.env.NEXT_PUBLIC_SMS_API_KEY },
      }
    )
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

  await fetch(process.env.NEXT_PUBLIC_SMS_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": process.env.NEXT_PUBLIC_SMS_API_KEY,
    },
    body: JSON.stringify({ to: mobile_number, message: key }),
  })
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
}

async function sendEmail(email, message) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_TEST_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_TEST_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Secret Organization 👻" <${process.env.NEXT_PUBLIC_EMAIL_TEST_USER}>`,
    to: email,
    subject: "Secret Message",
    text: message,
    html: `<b>${message}</b>`,
  });
}

export default async function handler(req, res) {
  res.status(500).send({ message: "Encryption has been temporarily disabled" });
  // try {
  //   const { message, key, email, mobile_number } = req.body;

  //   const encryptedMessage = encrypt(message, key);
  //   await sendEmail(email, encryptedMessage);
  //   await sendSMS(mobile_number, key);

  //   res.status(200).json({ message: "Message has been encrypted" });
  // } catch (error) {
  //   console.log(error);
  //   res
  //     .status(500)
  //     .send({ message: error.message ?? "Could not encrypt message" });
  // }
}
