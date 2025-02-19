import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config({});

const CRYPTO_KEY = Buffer.from(process.env.CRYPTO_ENCRYPTED, "hex");
if (CRYPTO_KEY.length != 32) throw new Error("Crypto-key must be 32 bytes");

const encrypt = (text) => {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", CRYPTO_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return iv.toString("hex") + ":" + encrypted + ":" + authTag;
};

const decrypt = (text) => {
  const [iv, encrypted, authTag] = text
    .split(":")
    .map((part) => Buffer.from(part, "hex"));

  const decipher = crypto.createDecipheriv("aes-256-gcm", CRYPTO_KEY, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

export { encrypt, decrypt };
