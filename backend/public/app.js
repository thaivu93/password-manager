"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const PORT = 3000;
const server = http_1.default.createServer((req, res) => {
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
