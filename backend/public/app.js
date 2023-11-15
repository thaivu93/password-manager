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
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const pg_1 = require("pg");
const database_1 = require("./config/database");
const getData_1 = require("./db_query/getData");
const PORT = 3000;
const server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pathUrl = url_1.default.parse(req.url || '', true);
    const path = pathUrl.path;
    const queryParams = pathUrl.query;
    switch (path) {
        // Handle login and create session
        case '/login': {
            if (req.method === 'POST') {
                const client = new pg_1.Client(database_1.config);
                try {
                    client.connect();
                }
                catch (error) {
                    console.error(`Unable to connect ${error}`);
                    throw error;
                }
                finally {
                    client.end();
                }
                break;
            }
            else {
                res.writeHead(405, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid request' }));
                break;
            }
        }
        case '/passwords': {
            if (req.method === 'GET') {
                const client = new pg_1.Client(database_1.config);
                const data = yield (0, getData_1.getDataPassword)(1, client);
                console.log(client);
                console.log(data);
                const returnData = JSON.stringify(data);
                // set cors header to allow cors
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'Get');
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(returnData);
                break;
            }
        }
        default: {
            res.writeHead(200, { 'Content-type': 'application.json' });
            res.end('Default entry');
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
