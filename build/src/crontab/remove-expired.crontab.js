"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const perishables_services_1 = __importDefault(require("../services/perishables.services"));
class RemoveExpiredCRON {
    constructor() {
        this.start();
    }
    start() {
        this.cronJob = node_cron_1.default.schedule('0 0 * * *', () => {
            console.log('Deleting Expired Records');
            perishables_services_1.default.deleteExpiredStock();
        }, {
            scheduled: false
        });
        this.cronJob.start();
    }
}
exports.default = RemoveExpiredCRON;
