"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const track_1 = __importDefault(require("./controllers/track"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.get('/', (req, res) => res.send('Express + TypeScript Server'));
app.use('/api/v1/tracks', track_1.default);
exports.default = app;
