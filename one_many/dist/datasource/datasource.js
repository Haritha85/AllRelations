"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Users_entity_1 = require("../entities/Users.entity");
//import { Profile } from "../entities/Profile.entity";
var Todo_entity_1 = require("../entities/Todo.entity");
var AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Haritha123",
    database: "typeorm_db",
    logging: true,
    synchronize: true,
    entities: {
        Users: Users_entity_1.Users,
        Todo: Todo_entity_1.Todo
    },
    migrations: ["dist/migrations/**/*.js"],
    options: {
        trustServerCertificate: true,
        useUTC: true
    },
    requestTimeout: 300000,
});
exports.default = AppDataSource;
