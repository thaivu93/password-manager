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
const url_1 = __importDefault(require("url"));
const http_1 = __importDefault(require("http"));
const pg_1 = require("pg");
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const getData_1 = require("./db_query/getData");
const login_1 = require("./routes/login");
const PORT = 3000;
const server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, cors_1.default)()(req, res, () => { });
    const pathUrl = url_1.default.parse(req.url || '', true);
    const path = pathUrl.path;
    const pathSegment = (path === null || path === void 0 ? void 0 : path.split('/').filter((segment) => segment !== '')) || [];
    const queryParams = pathUrl.query;
    switch (pathSegment[0]) {
        case 'login': {
            (0, login_1.handleLogin)(req, res, database_1.config);
            break;
        }
        case 'passwords': {
            if (pathSegment.length === 1 && req.method === 'GET') {
                const client = new pg_1.Client(database_1.config);
                const data = yield (0, getData_1.getDataPassword)(1, client);
                const returnData = JSON.stringify(data);
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'Get');
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(returnData);
                break;
            }
            else if (pathSegment.length === 2) {
                const passwordId = pathSegment[1];
                const client = new pg_1.Client(database_1.config);
                if (req.method === 'POST') {
                    const query = ``;
                    break;
                }
                if (req.method === 'PUT') {
                    break;
                }
                if (req.method === 'DELETE') {
                    break;
                }
            }
        }
        default: {
            res.writeHead(200, { 'Content-type': 'application.json' });
            res.end('hello');
            break;
        }
    }
}));
function errorOnConnection(err) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(`Server listening on port ${PORT}`);
    }
}
server.listen(PORT, errorOnConnection);
