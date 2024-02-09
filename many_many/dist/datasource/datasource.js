"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Student_entity_1 = require("../entities/Student.entity");
const Course_entity_1 = require("../entities/Course.entity");
//import { Profile } from "../entities/Profile.entity";
const AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Haritha123",
    database: "typeorm_db",
    logging: true,
    synchronize: true,
    entities: [
        Student_entity_1.Student,
        Course_entity_1.Course
    ],
    options: {
        trustServerCertificate: true,
        useUTC: true
    },
    requestTimeout: 300000,
});
exports.default = AppDataSource;
