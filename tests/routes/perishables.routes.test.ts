import express from 'express'
import supertest from 'supertest'
import {PerishablesRoutes} from '../../src/routes/perishables.routes'

const app = express()
app.use(express.json());

new PerishablesRoutes(app)

test("get item quantity route works", done => {
  supertest(app)
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
  supertest(app)
    .post("/eggs/sell")
    .send({
        "quantity": 5,
        "expiry": 1640991600000
    })
    .then(() => {
      supertest(app)
        .get("/eggs/quantity")
        .expect(200, done);
    });
});