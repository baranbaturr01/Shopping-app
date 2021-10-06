"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require('dotenv');
dotenv.config();
var POSTGRE_HOST = process.env.POSTGRE_HOST || 'localhost';
var POSTGRE_DATABASE = process.env.POSTGRE_DATABSE || 'db';
var POSTGRE_USER = process.env.POSTGRE_USER || 'user';
var POSTGRE_PASS = process.env.POSTGRE_PASS || 'pass';
var POSTGRE = {
    host: POSTGRE_HOST,
    database: POSTGRE_DATABASE,
    user: POSTGRE_USER,
    pass: POSTGRE_PASS
};
var SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
var SERVER_PORT = process.env.SERVER_PORT || 1337;
var SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
var config = {
    postgresql: POSTGRE,
    server: SERVER
};
exports.default = config;
