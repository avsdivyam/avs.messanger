import { WithImplicitCoercion } from 'buffer';
import * as crypto from 'crypto';

/**
 * Encrypts data into a token using AES-256-CBC.
 * @param {string} data - The data to encrypt.
 * @param {string} secretKey - The secret key (32 bytes for AES-256).
 * @param {string} iv - The initialization vector (16 bytes).
 * @returns {string} The encrypted token (base64 encoded).
 */
function encryptToken(data: string, secretKey: WithImplicitCoercion<string>, iv: WithImplicitCoercion<string>) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'utf8'), Buffer.from(iv, 'utf8'));
    let encrypted = cipher.update(data, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

module.exports = encryptToken;