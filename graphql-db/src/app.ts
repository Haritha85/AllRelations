import AppDataSource from "./Datasource/datasource";
import express,{Request,Response} from "express";
import { ApolloServer,gql } from "apollo-server-express";
import { buildSchema } from "graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { usertypeDefs } from "./typedefs/usertypedef";
import { bookResolver } from "./resolvers/BookResolver";
import { bookTypeDefs } from "./typedefs/booktypedef";

const app=express();
const PORT=5050;
 
 const resolvers=[
    UserResolver,
    bookResolver
 ]
 const typeDefs=[
    usertypeDefs,
    bookTypeDefs
    
 ]
const server=new ApolloServer({
    typeDefs,resolvers
})
server.start().then(() => {
    server.applyMiddleware({ app });AppDataSource.initialize()
    .then(()=>{
        console.log("Database is connected");
    })
    .catch((err)=>{
        console.log(err);
    })
// AppDataSource.initialize()
//     .then(() => {
//       console.log("connected")
//     })
//     .catch((err) => console.log("error while connecting",err));

 
app.listen(PORT,()=>{
    console.log("server is running.");
})
})
