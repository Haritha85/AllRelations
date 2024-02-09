"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = (0, apollo_server_express_1.gql) `
   type User{
    id:Int!
    firstname:String!
    lastname:String!
    city:String!

   }
   type Query{
    getUser(id:Int!):User!
    getAllUsers:[User]!
   }
   input createuserinput{
    firstname:String!
    lastname:String!
    city:String!
   }
   input updateuserinput{
    id:Int!
    firstname:String
    lastname:String
    city:String
   }
  type Mutation{
    createUser(input:createuserinput!):User!
    updateUser(input:updateuserinput): User
    deleteUser(id:Int!):String
  }
   
   `;
