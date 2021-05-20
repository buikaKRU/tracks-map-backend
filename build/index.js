"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database"));
const express_form_data_1 = __importDefault(require("express-form-data"));
const server_1 = __importDefault(require("./server"));
//https://blog.logrocket.com/typescript-with-node-js-and-express/
const PORT = 5000;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
//app.use(morgan('dev'));
server_1.default.use(express_1.default.json());
server_1.default.use(express_1.default.urlencoded({ extended: true }));
server_1.default.use(express_form_data_1.default.parse());
// union the body and the files
server_1.default.use(express_form_data_1.default.union());
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
