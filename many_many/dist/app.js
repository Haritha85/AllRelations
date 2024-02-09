"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
// import bodyParser from 'body-parser';
const control_1 = __importDefault(require("./Controller/control"));
const datasource_1 = __importDefault(require("./datasource/datasource"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', control_1.default);
datasource_1.default.initialize()
    .then(() => {
    console.log("connected");
})
    .catch((err) => console.log("error while connecting", err));
app.listen(8080, () => {
    console.log("running");
});
