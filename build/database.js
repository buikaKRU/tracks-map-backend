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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require('chalk');
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const envFiles = {
    development: '.env',
    test: '.env.test',
};
dotenv_1.default.config({
    //@ts-ignore
    path: envFiles[(_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV],
});
//@ts-ignore
const env = dotenv_1.default.parsed || process.env;
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoConnectionString = `mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_URI}:${env.DB_PORT}/data?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`;
    console.log(mongoConnectionString);
    try {
        const opts = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        };
        yield mongoose_1.default.connect(mongoConnectionString, opts);
        console.log(chalk.green(`[database] 🤘 Connected to the "${process.env.NODE_ENV}" database on port ${env.DB_PORT}`));
    }
    catch (err) {
        console.log(chalk.red('[database] Problem with connecting to the database'));
        console.log(err);
    }
    ;
});
exports.default = connect;
