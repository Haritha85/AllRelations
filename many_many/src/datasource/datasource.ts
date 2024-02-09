import { DataSource } from "typeorm";
import { Student } from "../entities/Student.entity";
import { Course } from "../entities/Course.entity";
//import { Profile } from "../entities/Profile.entity";
const AppDataSource=new DataSource({
    type:"mssql",
    host:"localhost",
    port:1433,
    username:"sa",
    password:"Haritha123",
    database:"typeorm_db",
    logging:true,
    synchronize:true,
    entities:[
      Student,
      Course
    ],
    options: {
       
        trustServerCertificate: true,
        useUTC:true
      },
      requestTimeout:300000,
 
});
 
export default AppDataSource;