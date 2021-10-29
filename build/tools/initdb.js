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
const fs_extra_1 = __importDefault(require("fs-extra"));
const pg_1 = require("pg");
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("../src/utils/logger"));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    // read environment variables
    // create an instance of the PostgreSQL client
    const PGHOST = config_1.default.get('PGHOST');
    const PGUSER = config_1.default.get('PGUSER');
    const PGDATABASE = config_1.default.get('PGDATABASE');
    const PGPASSWORD = config_1.default.get('PGPASSWORD');
    const PGPORT = config_1.default.get('PGPORT');
    const client = new pg_1.Client({
        user: PGUSER,
        host: PGHOST,
        database: PGDATABASE,
        password: PGPASSWORD,
        port: PGPORT,
    });
    try {
        // connect to the local database server
        yield client.connect();
        // read the contents of the initdb.pgsql file
        const sql = yield fs_extra_1.default.readFile("./tools/initdb.pgsql", { encoding: "UTF-8" });
        // split the file into separate statements
        const statements = sql.split(/;\s*$/m);
        for (const statement of statements) {
            if (statement.length > 3) {
                // execute each of the statements
                yield client.query(statement);
            }
        }
    }
    catch (e) {
        logger_1.default.error(e);
        throw e;
    }
    finally {
        yield client.end();
    }
});
init().then(() => {
    logger_1.default.info("finished");
}).catch(() => {
    logger_1.default.error("finished with errors");
});
