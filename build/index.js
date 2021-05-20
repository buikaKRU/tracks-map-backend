"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const database_1 = __importDefault(require("./database"));
const server_1 = __importDefault(require("./server"));
//https://blog.logrocket.com/typescript-with-node-js-and-express/
const PORT = 5000;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
//app.use(morgan('dev'));
server_1.default.use(body_parser_1.urlencoded({ extended: true }));
database_1.default().then(() => {
    setTimeout(() => {
        server_1.default.listen(PORT, () => {
            //npx kill-port 5000
            //pkill node
            //pkill nodejs
            console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
        });
    }, 1000);
}).catch((e) => {
    console.log(e);
});
