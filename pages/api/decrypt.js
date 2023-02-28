import crypto from "crypto";

function decrypt(message, key) {
  const decipher = crypto.createDecipher("des", key);
  let decryptedtext = decipher.update(message, "hex", "utf8");
  decryptedtext += decipher.final("utf8");
  return decryptedtext;
}

export default function handler(req, res) {
  try {
    const { message, key } = req.body;

    const decryptedMessage = decrypt(message, key);

    res.status(200).json({ message: decryptedMessage });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: error.message ?? "Could not decrypt message" });
  }
}
