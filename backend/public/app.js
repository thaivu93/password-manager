"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const database_1 = require("./config/database");
const passwords_1 = require("./api/passwords");
const PORT = 3000;
const server = http_1.default.createServer((req, res) => {
    const pathUrl = url_1.default.parse(req.url || '', true);
    const path = pathUrl.path;
    const queryParams = pathUrl.query;
    switch (path) {
        // Handle login and create session
        case '/login': {
            if (req.method === 'POST') {
                try {
                    database_1.client.connect();
                }
                catch (error) {
                    console.error(`Unable to connect ${error}`);
                    throw error;
                }
                finally {
                    database_1.client.end();
                }
            }
            else {
                res.writeHead(405, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid request' }));
            }
        }
        case '/logout': {
        }
        case '/resigster': {
        }
        case '/password/add': {
        }
        case '/password/delete': {
        }
        case '/passwords': {
            if (req.method === 'GET') {
                const data = (0, passwords_1.getPasswordData)(1, database_1.client);
                const returnData = JSON.stringify(data);
                // set cors header to allow cors
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', 'Get');
                res.writeHead(200, { 'Content-type': 'application/json' });
                res.end(returnData);
            }
        }
        default: {
            res.writeHead(200, { 'Content-type': 'application.json' });
            res.end('Default entry');
        }
    }
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('End here');
});
function errorOnConnection(err) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(`Server listening on port ${PORT}`);
    }
}
server.listen(PORT, errorOnConnection);
