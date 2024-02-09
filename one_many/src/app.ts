import express from 'express';
import "reflect-metadata";
import { Users } from './entities/Users.entity';
// import bodyParser from 'body-parser';
import router from './Controller/control';
import AppDataSource from './datasource/datasource';
const app:express.Application=express();
 
app.use(express.json());
app.use('/',router);
 
AppDataSource.initialize()
  .then(() => {
    console.log("connected")
  })
  .catch((err) => console.log("error while connecting",err));
app.listen(8080,()=>
{
    console.log("running");
})