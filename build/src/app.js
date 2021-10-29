"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./utils/logger"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const express_session_1 = __importDefault(require("express-session"));
const redis_1 = __importDefault(require("redis"));
const index_routes_1 = require("./routes/index.routes");
const perishables_routes_1 = require("./routes/perishables.routes");
//cron
const remove_expired_crontab_1 = __importDefault(require("./crontab/remove-expired.crontab"));
const port = config_1.default.get('port');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)()); //configure for security on prod
app.use((0, compression_1.default)());
const routes = [];
routes.push(new index_routes_1.IndexRoutes(app));
routes.push(new perishables_routes_1.PerishablesRoutes(app));
const client = redis_1.default.createClient();
const redisStore = require('connect-redis')(express_session_1.default);
app.use((0, express_session_1.default)({
    secret: 'keyboard cat',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
    saveUninitialized: false,
    resave: false
}));
// Start Server
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`App is running at http://localhost:${port}`);
    // await connect();
    routes.forEach((route) => {
        logger_1.default.info(`Routes configured for ${route.getName()}`);
    });
}));
// start remove expired items cron
const cron = new remove_expired_crontab_1.default();
