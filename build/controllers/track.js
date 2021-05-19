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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Get all posts
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('maybe??');
    //const tracks = await Track.find()
    // res.send(tracks)
    res.send('tracks');
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('add');
    res.send(req.body);
    res.status(200);
}));
const tracks = router;
exports.default = tracks;
