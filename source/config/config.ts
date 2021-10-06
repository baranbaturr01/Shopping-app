const dotenv = require('dotenv')
dotenv.config();


const POSTGRE_HOST = process.env.POSTGRE_HOST || 'localhost'
const POSTGRE_DATABASE = process.env.POSTGRE_DATABSE || 'db'
const POSTGRE_USER = process.env.POSTGRE_USER || 'user'
const POSTGRE_PASS = process.env.POSTGRE_PASS || 'pass'

const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600
const SERVER_TOKEN_ISSUER = process.env.POSTGRE_USER || 'issuer'
const SERVER_TOKEN_SECRET = process.env.POSTGRE_USER || 'supersecret'


const POSTGRE = {
    host: POSTGRE_HOST,
    database: POSTGRE_DATABASE,
    user: POSTGRE_USER,
    pass: POSTGRE_PASS
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || 1337;

const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    token: {
        expireTime: SERVER_TOKEN_EXPIRETIME,
        issuer: SERVER_TOKEN_ISSUER,
        secret: SERVER_TOKEN_SECRET
    }
};

const config = {
    postgresql: POSTGRE,
    server: SERVER
};

export default config;