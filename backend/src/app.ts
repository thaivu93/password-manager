import http from 'http';
import url from 'url';
import crypto from 'crypto';
import querystring from 'querystring';
import { client } from './config/database';

import { login } from './api/login';

const PORT: number = 3000;

const server = http.createServer((req, res) => {
    const pathUrl = url.parse(req.url || '', true);
    const path = pathUrl.path;
    const queryParams = pathUrl.query;

    switch (path) {
        // Handle login and create session
        case '/login': {
            if (req.method === 'POST') {
                try {
                    client.connect();
                } catch (error) {
                    console.error(`Unable to connect ${error}`);
                    throw error;
                } finally {
                    client.end();
                }
            } else {
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
        }
        default: {
            res.writeHead(200, { 'Content-type': 'application.json' });
            res.end('Default entry');
        }
    }

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
