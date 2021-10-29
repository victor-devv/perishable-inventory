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
const perishables_dao_1 = __importDefault(require("../dao/perishables.dao"));
// 
class PerishablesService {
    get(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const qty = yield perishables_dao_1.default.getItemQuantity(name);
            const expiry = yield perishables_dao_1.default.getItemMinExpiry(name);
            return { quantity: qty, expiry: expiry };
        });
    }
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return perishables_dao_1.default.addItem(resource);
        });
    }
    sell(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return perishables_dao_1.default.sellItem(resource);
        });
    }
    deleteExpiredStock() {
        return __awaiter(this, void 0, void 0, function* () {
            return perishables_dao_1.default.deleteExpiredStocks();
        });
    }
}
exports.default = new PerishablesService();
