"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookTypeDefs = void 0;
const apollo_server_1 = require("apollo-server");
exports.bookTypeDefs = (0, apollo_server_1.gql) `
    type Book {
        id: Int!
        name: String!
        isbn: String!
        publisher: String!
        country: String!
    }
 
    type Query {
        fetchAndSaveBooks: [Book!]!
        getBook(input:getSpecificBook!):Book
        getAllBooks:[Book!]!
        
    }
    input getSpecificBook{
        id:Int
        name:String
        isbn:String
        publisher:String
        country:String
    }
    input createBook{
        name:String!
        isbn:String!
        publisher:String!
        country:String!
    }
    input updateBook{
        id:Int!
        name:String
        isbn:String
        publisher:String
        country:String
    }
    type Mutation{
    createBook(input:createBook!):Book!
    updateBook(input:updateBook): String
    deleteBook(id:Int!):String
  }
   
 
`;
