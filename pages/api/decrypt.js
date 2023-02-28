import crypto from "crypto-js";

export default function handler(req, res) {
  const { message, key } = req.body;

  // decrypt cipher text using DES algorithm
  const decryptedMessage = crypto.DES.decrypt(message, key).toString();

  res.status(200).json({ message: decryptedMessage });
}
