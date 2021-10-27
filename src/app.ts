import express from 'express'
import config from 'config'
import logger from './utils/logger'
import cors from 'cors';
import compression from "compression";
import session from 'express-session'
import redis from "redis";

// import * as routes from "./routes/common"
import {CommonRoutesConfig} from './routes/common.routes';
import {IndexRoutes} from './routes/index.routes';
import {PerishablesRoutes} from './routes/perishables.routes';

//cron
import RemoveExpiredCRON from './crontab/remove-expired.crontab'

const port = config.get<number>('port')
const app = express()
app.use(express.json());
app.use(cors()) //configure for security on prod
app.use(compression())

const routes: Array<CommonRoutesConfig> = [];
routes.push(new IndexRoutes(app));
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

// Start Server
app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`)

    // await connect();

    routes.forEach((route: CommonRoutesConfig) => {
        logger.info(`Routes configured for ${route.getName()}`);
    });
})

// start remove expired items cron
const cron = new RemoveExpiredCRON();

