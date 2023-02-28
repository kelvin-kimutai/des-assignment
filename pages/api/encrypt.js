import emailjs from "@emailjs/browser";
import crypto from "crypto";

function encrypt(message, key) {
  const cipher = crypto.createCipher("des", key);
  let ciphertext = cipher.update(message, "utf8", "hex");
  ciphertext += cipher.final("hex");
  return ciphertext;
}

async function sendSMS(mobile_number, key) {
  await fetch(process.env.NEXT_PUBLIC_SMS_ENDPOINT, {
    method: "POST",
    headers: {
      "api-key": process.env.NEXT_PUBLIC_SMS_API_KEY,
    },
    body: JSON.stringify({ to: mobile_number, message: key }),
  }).catch((e) => console.log(e));
}

async function sendEmail(email, message) {
  const API_KEY = process.env.NEXT_PUBLIC_MAILJET_API_KEY;
  const DOMAIN = "YOUR_DOMAIN_NAME";

  const formData = require("form-data");
  const Mailgun = require("mailgun.js");

  const mailgun = new Mailgun(formData);
  const client = mailgun.client({ username: "api", key: API_KEY });

  const messageData = {
    from: "Excited User <me@samples.mailgun.org>",
    to: email,
    subject: "Secret Message",
    text: message,
  };

  await client.messages
    .create(DOMAIN, messageData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

export default async function handler(req, res) {
  const { message, key, email, mobile_number } = req.body;

  const encryptedMessage = encrypt(message, key);
  await sendEmail(email, message);
  await sendSMS(mobile_number, key);

  res.status(200).json({ message: encryptedMessage });
}
