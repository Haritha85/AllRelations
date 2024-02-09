"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
// import bodyParser from 'body-parser';
var control_1 = __importDefault(require("./Controller/control"));
var datasource_1 = __importDefault(require("./datasource/datasource"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', control_1.default);
datasource_1.default.initialize()
    .then(function () {
    console.log("connected");
})
    .catch(function (err) { return console.log("error while connecting", err); });
app.listen(8080, function () {
    console.log("running");
});
