import {connection} from "../config/postgresql";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config/config";

export class Users {

    id: number = 0;
    username: string = "";
    password: string = ""

    constructor(id = 0) {
        this.id = id
    }

    async register() {
        const result = await connection.query('insert into users(username, password) values ($1, $2) RETURNING *', [
            this.username,
            this.password,
        ])

        console.log('User Model', result.rows[0])
        return true
    }

    async login(username, password) {

        const user = await connection.query(`SELECT * FROM users WHERE username = '${username}'`)

        if (user.rows.length === 0) {
            return false
        }

        const compare = await bcryptjs.compare(password, user.rows[0].password)

        if (!compare) {
            return false
        }
        return jwt.sign({user_id: user.rows[0].id, token_type: 'ADMIN'}, config.server.token.secret)
    }

    async findById(id) {
        const user = await connection.query(`SELECT * FROM users WHERE id = '${id}'`)

        if (!user) {
            return false
        }
        return user

    }
}