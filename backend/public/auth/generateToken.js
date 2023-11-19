"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
function generateToken(payload, secretKey) {
    const header = {
        alg: 'SHA256',
        type: 'JWT',
    };
    const encodeHeader = Buffer.from(JSON.stringify(header)).toString('base64');
    const payloadToEncode = Buffer.from(JSON.stringify(payload)).toString('base64');
    const dataToSign = `${encodeHeader}.${payloadToEncode}`;
    const signature = crypto_1.default
        .createHmac('sha256', secretKey)
        .update(dataToSign)
        .digest('hex');
    return `${encodeHeader}.${payloadToEncode}.${signature}`;
}
exports.generateToken = generateToken;
