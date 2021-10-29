"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRoutes = void 0;
const common_routes_1 = require("./common.routes");
class IndexRoutes extends common_routes_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'IndexRoutes');
    }
    configureRoutes() {
        this.app.route(`/healthcheck`)
            .get((req, res) => {
            res.status(200).send(`App Running`);
        });
        return this.app;
    }
}
exports.IndexRoutes = IndexRoutes;
