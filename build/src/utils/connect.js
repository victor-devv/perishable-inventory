"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("config"));
const PGHOST = config_1.default.get('PGHOST');
const PGUSER = config_1.default.get('PGUSER');
const PGDATABASE = config_1.default.get('PGDATABASE');
const PGPASSWORD = config_1.default.get('PGPASSWORD');
const PGPORT = config_1.default.get('PGPORT');
exports.default = new sequelize_1.Sequelize({
    dialect: "postgres",
    host: PGHOST,
    port: PGPORT,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD
});
