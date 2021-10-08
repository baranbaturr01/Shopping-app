import {Pool, Client} from 'pg'


class Database {

    client: Client

    constructor() {
        this.client = new Client({
            user: 'user',
            host: 'localhost',
            database: 'db',
            password: 'pass',
            port: 35432
        })
        this.client.connect()
    }

}

export default Database