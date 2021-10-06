import http from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import routes from './routes/routes'
import {Pool, Client} from 'pg'
import {connection, initDb} from './config/postgresql'

const NAMESPACE = `Server`
const router = express()

router.use(async (req, res, next) => {
    await initDb()

    logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', async () => {
        connection.end(err => {
            console.log('client has disconnected')
            if (err) {
                console.log('error during disconnection', err.stack)
            }
        })
        logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    })

    next()
})

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/* ROUTES */

router.use('/case', routes)
/*ERROR HANDLING*/
router.use((req, res, next) => {
    const error = new Error(`Not Found`)

    return res.status(404).json({message: error.message})
})

/* Create Server */
const httpServer = http.createServer(router)

httpServer.listen(config.server.port, () => logging.info(NAMESPACE, `Server running on ${config.server.hostname}:${config.server.port}`))