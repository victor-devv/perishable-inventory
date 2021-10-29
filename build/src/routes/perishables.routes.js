"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerishablesRoutes = void 0;
const common_routes_1 = require("./common.routes");
const perishables_middleware_1 = __importDefault(require("../middleware/perishables.middleware"));
const perishables_controller_1 = __importDefault(require("../controllers/perishables.controller"));
class PerishablesRoutes extends common_routes_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'PerishablesRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/:item/add`)
            .post(perishables_middleware_1.default.validateRequiredAddItemBodyFields, perishables_controller_1.default.addItem);
        this.app
            .route(`/:item/sell`)
            .post(perishables_middleware_1.default.validateRequiredSellItemBodyFields, perishables_controller_1.default.sellItem);
        this.app
            .route(`/:item/quantity`)
            .get(perishables_controller_1.default.getItem);
        return this.app;
    }
}
exports.PerishablesRoutes = PerishablesRoutes;
