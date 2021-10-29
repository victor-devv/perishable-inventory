"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const index_routes_1 = require("../../src/routes/index.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
new index_routes_1.IndexRoutes(app);
test("healthcheck route works", done => {
    (0, supertest_1.default)(app)
        .get("/healthcheck")
        .expect('App Running')
        .expect(200, done);
});
