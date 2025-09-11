const crypto = require('crypto');
const fs = require('fs');

const arrayBufferToBase64 = buffer => Buffer.from(buffer).toString('base64');

const encrypt = (buffer, password) => {

  const salt = crypto.randomBytes(18);
  const iv = crypto.randomBytes(12);
  const key = crypto.pbkdf2Sync(password, salt, 1000000, 32, 'sha256');

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  
  const encryptedWithTag = Buffer.concat([cipher.update(crypto.createHash('sha256').update(buffer).digest()), cipher.final(), cipher.getAuthTag()]);

  return arrayBufferToBase64(salt) + arrayBufferToBase64(iv) + arrayBufferToBase64(encryptedWithTag);
};

if (require.main === module)
  fs.writeFileSync('daireikai.js.txt', encrypt(fs.readFileSync('daireikai.js'), process.env.DRKPASS), 'utf8');
