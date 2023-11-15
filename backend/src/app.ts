import axios from 'axios';
import http from 'http';
import url from 'url';
import crypto from 'crypto';
import querystring from 'querystring';
import { Client } from 'pg';

import { config } from './config/database';
import { getDataPassword } from './db_query/getData';

const PORT: number = 3000;

const server = http.createServer(async (req, res) => {
    const pathUrl = url.parse(req.url || '', true);
    const path = pathUrl.path;
    const queryParams = pathUrl.query;

    switch (path) {
        // Handle login and create session
        case '/login': {
            if (req.method === 'POST') {
                const client = new Client(config);
                try {
                    client.connect();
                } catch (error) {
                    console.error(`Unable to connect ${error}`);
                    throw error;
                } finally {
                    client.end();
                }
                break;
            } else {
                res.writeHead(405, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid request' }));
                break;
            }
        }

        case '/passwords': {
            if (req.method === 'GET') {
                const client = new Client(config);
                const data = await getDataPassword(1, client);
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
});

function errorOnConnection(err: NodeJS.ErrnoException | null) {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server listening on port ${PORT}`);
    }
}

server.listen(PORT, errorOnConnection as () => void);
