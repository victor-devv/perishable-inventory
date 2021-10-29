"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
class CommonMiddleware {
    constructor() {
        this.handleCors = (router) => router.use((0, cors_1.default)({ credentials: true, origin: true }));
        this.handleCompression = (router) => {
            router.use((0, compression_1.default)());
        };
    }
}
exports.default = new CommonMiddleware();
