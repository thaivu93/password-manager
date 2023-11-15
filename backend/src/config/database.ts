const user = process.env.USER_DEV;
const host = process.env.HOST_DEV;
const database = process.env.DB_DEV;
const password = process.env.PASSWORD_DEV;
const port = 5432;

const config = {
    user,
    host,
    database,
    password,
    port,
};

export { config };
