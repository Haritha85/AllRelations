import { DataSource } from "typeorm";

const AppDataSource=new DataSource({
    type:"mssql",
    host:"localhost",
    port:1433,
    username:"sa",
    password:"Haritha123",
    database:"graphql",
    logging:true,
    synchronize:false,
    
    entities:["dist/entities/*.js"],
    migrations:["dist/migrations/*.js"],
    //subscribers:["dist/subscriber/*.js"],
   
    
    options: {
        
        trustServerCertificate: true
      },
      requestTimeout:300000,

});



export default AppDataSource;
