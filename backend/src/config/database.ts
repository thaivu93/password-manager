import { Client } from 'pg';

const user = process.env.USER_DEV;
const host = process.env.HOST_DEV;
const database = process.env.DB_DEV;
const password = process.env.PASSWORD_DEV;
const port = 5432;

const client = new Client({
    user,
    host,
    database,
    password,
    port,
});

console.log(user, host, database, password, port);
export { client };
