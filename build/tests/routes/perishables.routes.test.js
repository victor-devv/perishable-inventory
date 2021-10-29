"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const perishables_routes_1 = require("../../src/routes/perishables.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
new perishables_routes_1.PerishablesRoutes(app);
test("get item quantity route works", done => {
    (0, supertest_1.default)(app)
        .get("/eggs/quantity")
        .expect("Content-Type", /json/)
        .expect(200, done);
});
// test("add item route works", done => {
//   supertest(app)
//     .post("/eggs/add")
//     .send({
//         "quantity": 15,
//         "expiry": 1640991600000
//     })
//     .then(() => {
//       supertest(app)
//         .get("/eggs/quantity")
//         .expect("Content-Type", /json/);
//     });
// });
test("sell item route works", done => {
    (0, supertest_1.default)(app)
        .post("/eggs/sell")
        .send({
        "quantity": 5,
        "expiry": 1640991600000
    })
        .then(() => {
        (0, supertest_1.default)(app)
            .get("/eggs/quantity")
            .expect(200, done);
    });
});
