"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = void 0;
const crypto_1 = __importDefault(require("crypto"));
const pg_1 = require("pg");
const generateToken_1 = require("../../auth/generateToken");
const validateToke_1 = require("../../auth/validateToke");
const secretKey_1 = require("../../config/secretKey");
function handleLogin(req, res, config) {
    if (req.method === 'POST') {
        let formData = '';
        req.on('data', (chunk) => {
            if (Buffer.isBuffer(chunk)) {
                formData += chunk.toString();
            }
            else if (typeof chunk === 'string') {
                formData += chunk;
            }
            else {
                console.error('Invalid data type');
                typeof chunk;
            }
        });
        req.on('end', () => __awaiter(this, void 0, void 0, function* () {
            const contentType = req.headers['content-type'] || '';
            if (contentType.includes('application/json')) {
                const client = new pg_1.Client(config);
                const parsedJson = JSON.parse(formData);
                const { username, password, token } = parsedJson;
                try {
                    if (token) {
                        const decodedPayload = (0, validateToke_1.validateToken)(token, secretKey_1.secretKey);
                        res.writeHead(200, {
                            'Content-type': 'application/json',
                        });
                        res.end(JSON.stringify({
                            msg: 'Authentication success',
                            username: decodedPayload.username,
                            role: decodedPayload.role,
                            email: decodedPayload.email,
                        }));
                    }
                    else {
                        yield client.connect();
                        const query = `SELECT user_name, email, login_password, login_password_salt, role.role 
                        FROM "user"
                        JOIN role ON "user".role_id = role.role_id
                        WHERE user_name = '${username}';`;
                        const queryResult = yield client.query(query);
                        const dataRows = queryResult.rows;
                        if (dataRows.length === 0) {
                            res.writeHead(401, {
                                'Content-type': 'application/json',
                            });
                            res.end(JSON.stringify({ msg: 'Data not found' }));
                            return;
                        }
                        const loginPassword = dataRows[0].login_password;
                        const loginPasswordSalt = dataRows[0].login_password_salt;
                        const email = dataRows[0].email;
                        const role = dataRows[0].role;
                        if (!isValidPassword(password, loginPassword, loginPasswordSalt)) {
                            res.writeHead(401, {
                                'Content-type': 'application/json',
                            });
                            res.end(JSON.stringify({ msg: 'Invalid Password' }));
                            return;
                        }
                        const newToken = (0, generateToken_1.generateToken)({ username, email, role }, secretKey_1.secretKey);
                        res.writeHead(200, {
                            'Content-type': 'application/json',
                            Auhorization: `Bearer ${newToken} `,
                        });
                        res.end(JSON.stringify({
                            msg: 'Login successful',
                            username: username,
                            token: newToken,
                        }));
                    }
                }
                catch (error) {
                    console.error(`Token verification failed: ${error}`);
                    res.writeHead(401, { 'Content-type': 'application/json' });
                    res.end(JSON.stringify({ msg: 'Invalid token' }));
                }
                finally {
                    yield client.end();
                }
            }
        }));
    }
}
exports.handleLogin = handleLogin;
function isValidPassword(password, loginPassword, salt) {
    const hash = crypto_1.default.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return hash === loginPassword;
}
