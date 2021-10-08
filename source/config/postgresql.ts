import {Pool, Client, Connection} from 'pg'
import config from './config'

const params = {
    user: config.postgresql.user,
    password: config.postgresql.pass,
    host: config.postgresql.host,
    database: config.postgresql.database,
    port: 35432
}

let connection;

async function initDb() {
    connection = new Client(params)
    return await connection.connect()
}

export {initDb, connection}
