import { Client } from 'pg';
const getDataPassword = async (user_id: number, client: Client) => {
    const query = `SELECT application.app_name, password FROM password 
    JOIN application
    ON password.app_id = application.app_id
    WHERE user_id = ${user_id}`;

    try {
        await client.connect();
        const data = await client.query(query);
        return data.rows;
    } catch (error) {
        console.error(`Error: ${error}`);
    } finally {
        client.end();
    }
    return;
};

export { getDataPassword };
