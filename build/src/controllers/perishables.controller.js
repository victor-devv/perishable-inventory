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
const perishables_services_1 = __importDefault(require("../services/perishables.services"));
class PerishablesController {
    getItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemName = req.params.item;
            const result = yield perishables_services_1.default.get(itemName);
            res.status(200).json(result);
        });
    }
    addItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.params.item;
            const { quantity, expiry } = req.body;
            const resource = {
                name: name,
                quantity: quantity,
                expiry: expiry
            };
            const result = yield perishables_services_1.default.create(resource);
            //.json(result)
            res.status(200).json({ status: "success", message: "Item added successfully" });
        });
    }
    ;
    sellItem(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const name = req.params.item;
            const { quantity } = req.body;
            const resource = {
                name: name,
                quantity: quantity,
            };
            const result = yield perishables_services_1.default.sell(resource);
            //.json(result)
            res.status(200).json(result);
        });
    }
}
exports.default = new PerishablesController();
