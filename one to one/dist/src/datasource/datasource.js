"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var user_1_entity_1 = require("../entities/user_1.entity");
var tabprofile_entity_1 = require("../entities/tabprofile.entity");
var AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Haritha123",
    database: "typeorm_db",
    logging: true,
    synchronize: false,
    entities: {
        user_1: user_1_entity_1.user_1,
        tabprofile: tabprofile_entity_1.tabprofile
    },
    migrations: ["dist/src/migrations/**/*.js"],
    options: {
        trustServerCertificate: true
    },
    requestTimeout: 300000,
});
exports.default = AppDataSource;
