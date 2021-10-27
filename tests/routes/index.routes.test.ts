import express from 'express'
import supertest from 'supertest'
import {IndexRoutes} from '../../src/routes/index.routes';

const app = express()
app.use(express.json());

new IndexRoutes(app)

test("healthcheck route works", done => {
  supertest(app)
    .get("/healthcheck")
    .expect('App Running')
    .expect(200, done);
});