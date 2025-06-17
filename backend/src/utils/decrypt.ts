import { WithImplicitCoercion } from "buffer";

const nodeCrypto = require('crypto');

/**
 * Decrypts an encrypted token using AES-256-CBC.
 * @param {string} token - The encrypted token (base64 encoded).
 * @param {string} secretKey - The secret key (32 bytes for AES-256).
 * @param {string} iv - The initialization vector (16 bytes).
 * @returns {string} The decrypted data.
 */
function decryptToken(token: any, secretKey: WithImplicitCoercion<string>, iv: WithImplicitCoercion<string>) {
    const decipher = nodeCrypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'utf8'), Buffer.from(iv, 'utf8'));
    let decrypted = decipher.update(token, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = decryptToken;