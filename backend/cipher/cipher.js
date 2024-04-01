const crypto = require('crypto');

// Check if CRYPTO_SECRET_KEY environment variable is defined
if (!process.env.CRYPTO_SECRET_KEY) {
    console.log(process.env.CRYPTO_SECRET_KEY);
  throw new Error('CRYPTO_SECRET_KEY environment variable is not defined');
}

// Check if CRYPTO_SECRET_IV environment variable is defined
if (!process.env.CRYPTO_SECRET_IV) {
  throw new Error('CRYPTO_SECRET_IV environment variable is not defined');
}

// Check if ENCRYPTION_METHOD environment variable is defined
if (!process.env.ECNRYPTION_METHOD) {
  throw new Error('ENCRYPTION_METHOD environment variable is not defined');
}

const encryptionIV = Buffer.from(process.env.CRYPTO_SECRET_IV, 'hex');

const encryptData= (data)=> {
    let cipher = crypto.createCipheriv(process.env.ECNRYPTION_METHOD, Buffer.from(process.env.CRYPTO_SECRET_KEY), encryptionIV);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
};

const decryptData = (data) => {
  let encryptedText = Buffer.from(data, 'hex');
  let decipher = crypto.createDecipheriv(process.env.ECNRYPTION_METHOD, Buffer.from(process.env.CRYPTO_SECRET_KEY), encryptionIV);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted;
};

module.exports = {encryptData, decryptData};

