"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usertypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.usertypeDefs = (0, apollo_server_express_1.gql) `
   type User{
    id:Int!
    firstname:String!
    lastname:String!
    city:String!

   }
   type Query{
    getUser(input:getSpecificUser!):User!
    getAllUsers:[User]!
   }
   type baseType{
        message: String!
        error: Boolean!
    }
    input getSpecificUser{
      id:Int
      firstname:String
      lastname:String
      city:String
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
    updateUser(input:updateuserinput): baseType
    deleteUser(id:Int!):String
  }
   
   `;
