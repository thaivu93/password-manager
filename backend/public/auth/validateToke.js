"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
function validateToken(token, secretKey) {
    const tokenPayload = token.split(' ')[1];
    const [encodedHeader, encodedPayload, signature] = tokenPayload.split('.');
    const dataToVerify = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = crypto_1.default
        .createHmac('sha256', secretKey)
        .update(dataToVerify)
        .digest('hex');
    if (signature === expectedSignature) {
        const decodedPayload = JSON.parse(Buffer.from(encodedPayload, 'base64').toString('utf-8'));
        return decodedPayload;
    }
    else {
        throw new Error('Invalid token');
    }
}
exports.validateToken = validateToken;
