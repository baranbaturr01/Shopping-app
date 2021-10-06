"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var logging_1 = __importDefault(require("./config/logging"));
var config_1 = __importDefault(require("./config/config"));
var routes_1 = __importDefault(require("./routes/routes"));
var pg_1 = require("pg");
var NAMESPACE = "Server";
var router = (0, express_1.default)();
var client = new pg_1.Client({
    user: 'user',
    host: 'localhost',
    database: 'db',
    password: 'pass',
    port: 35432
});
client.connect().then(function (result) {
    console.log('Veri tabanına Bağlandı');
    /* LOGGING */
    router.use(function (req, res, next) {
        logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - IP: [" + req.socket.remoteAddress + "]");
        res.on('finish', function () {
            logging_1.default.info(NAMESPACE, "METHOD: [" + req.method + "] - URL: [" + req.url + "] - STATUS: [" + res.statusCode + "] - IP: [" + req.socket.remoteAddress + "]");
        });
        next();
    });
    router.use(body_parser_1.default.urlencoded({ extended: true }));
    router.use(body_parser_1.default.json());
    /** Rules of our API */
    router.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /* ROUTES */
    router.use('/case', routes_1.default);
    /*ERROR HANDLING*/
    router.use(function (req, res, next) {
        var error = new Error("Not Found");
        return res.status(404).json({ message: error.message });
    });
    /* Create Server */
    var httpServer = http_1.default.createServer(router);
    httpServer.listen(config_1.default.server.port, function () { return logging_1.default.info(NAMESPACE, "Server running on " + config_1.default.server.hostname + ":" + config_1.default.server.port); });
}).catch(function (error) {
    console.log('hata');
    console.log(error);
    console.log(error.trace);
});
