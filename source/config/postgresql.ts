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


const Connect = async () => new Promise<Client>((resolve, reject) => {
    connection.connect((err) => {
        if (err) {
            reject(err)
            return
        }
        resolve(connection)
    })

})

const Query = async (connection: Client, query: string) => {
    new Promise(((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err) {
                reject(err)
            }
            resolve(result)
        })
    }))
}

export {initDb, connection, Connect, Query}
