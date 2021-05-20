"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database"));
const server_1 = __importDefault(require("./server"));
//https://blog.logrocket.com/typescript-with-node-js-and-express/
const PORT = 5050;
database_1.default().then(() => {
    server_1.default.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
}).catch((e) => {
    console.log(e);
});
