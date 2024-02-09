import { DataSource } from "typeorm";
import { user_1 } from "../entities/user_1.entity";
import { tabprofile } from "../entities/tabprofile.entity";
const AppDataSource=new DataSource({
    type:"mssql",
    host:"localhost",
    port:1433,
    username:"sa",
    password:"Haritha123",
    database:"typeorm_db",
    logging:true,
    synchronize:false,
    entities:{
      user_1,
      tabprofile
    },
    migrations:["dist/src/migrations/**/*.js"],
   
    
    options: {
        
        trustServerCertificate: true
      },
      requestTimeout:300000,

});

export default AppDataSource;