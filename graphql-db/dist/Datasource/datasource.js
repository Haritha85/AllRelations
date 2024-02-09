"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Haritha123",
    database: "graphql",
    logging: true,
    synchronize: false,
    entities: ["dist/entities/*.js"],
    migrations: ["dist/migrations/*.js"],
    //subscribers:["dist/subscriber/*.js"],
    options: {
        trustServerCertificate: true
    },
    requestTimeout: 300000,
});
exports.default = AppDataSource;
