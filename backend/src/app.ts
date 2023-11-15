import http from 'http';
import url from 'url';
import crypto from 'crypto';
import querystring from 'querystring';

const PORT: number = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/plain' });
    res.end('End here');
});

function errorOnConnection(err: NodeJS.ErrnoException | null) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server listening on port ${PORT}`);
    }
}

server.listen(PORT, errorOnConnection as () => void);
