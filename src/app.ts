import express from 'express'
import config from 'config'
import logger from './utils/logger'
import cors from 'cors';
import session from 'express-session'
import redis from "redis";
import cluster from 'cluster';
import http from 'http';
import { cpus } from 'os';
import process from 'process';

const numCPUs = cpus().length;

// import * as routes from "./routes/common"
import {CommonRoutesConfig} from './routes/common.routes';
import {IndexRoutes} from './routes/index.routes';
import {UsersRoutes} from './routes/user.routes';
import {PerishablesRoutes} from './routes/perishables.routes';

//cron
import RemoveExpiredCRON from './crontab/remove-expired.crontab'

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('online', function(worker) {
        console.log(`Worker ${process.pid} is online`);
    });

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);

        cluster.fork();
    });

} else {

    const cron = new RemoveExpiredCRON();

    const port = config.get<number>('port')
    const app = express()
    app.use(express.json());

    const routes: Array<CommonRoutesConfig> = [];
    routes.push(new IndexRoutes(app));
    routes.push(new UsersRoutes(app));
    routes.push(new PerishablesRoutes(app));

    const client  = redis.createClient();
    const redisStore = require('connect-redis')(session);
    app.use(session({
        secret: 'keyboard cat',
        // create new redis store.
        store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
        saveUninitialized: false,
        resave: false
    }));

    // (async () => {
    //     // Init Worker Pool
    //     const workerPoolEnabled = config.get<number>('WORKER_POOL_ENABLED')

    //     if (workerPoolEnabled === 1) {

    //     }

        // Start Server
        app.listen(port, async () => {
            logger.info(`App is running at http://localhost:${port}`)

            // await connect();

            routes.forEach((route: CommonRoutesConfig) => {
                logger.info(`Routes configured for ${route.getName()}`);
            });
        })
    // })()
}