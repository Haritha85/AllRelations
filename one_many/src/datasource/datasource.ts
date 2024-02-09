import { DataSource } from "typeorm";
import { Users } from "../entities/Users.entity";
//import { Profile } from "../entities/Profile.entity";
import { Todo } from "../entities/Todo.entity";
const AppDataSource=new DataSource({
    type:"mssql",
    host:"localhost",
    port:1433,
    username:"sa",
    password:"Haritha123",
    database:"typeorm_db",
    logging:true,
    synchronize:true,
    entities:{
      Users,
      Todo

    },
    migrations:["dist/migrations/**/*.js"],
    options: {
       
        trustServerCertificate: true,
        useUTC:true
      },
      requestTimeout:300000,
 
});
 
export default AppDataSource;