"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_1 = __importDefault(require("./Datasource/datasource"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const UserResolver_1 = require("./resolvers/UserResolver");
const usertypedef_1 = require("./typedefs/usertypedef");
const BookResolver_1 = require("./resolvers/BookResolver");
const booktypedef_1 = require("./typedefs/booktypedef");
const app = (0, express_1.default)();
const PORT = 5050;
const resolvers = [
    UserResolver_1.UserResolver,
    BookResolver_1.bookResolver
];
const typeDefs = [
    usertypedef_1.usertypeDefs,
    booktypedef_1.bookTypeDefs
];
const server = new apollo_server_express_1.ApolloServer({
    typeDefs, resolvers
});
server.start().then(() => {
    server.applyMiddleware({ app });
    datasource_1.default.initialize()
        .then(() => {
        console.log("Database is connected");
    })
        .catch((err) => {
        console.log(err);
    });
    // AppDataSource.initialize()
    //     .then(() => {
    //       console.log("connected")
    //     })
    //     .catch((err) => console.log("error while connecting",err));
    app.listen(PORT, () => {
        console.log("server is running.");
    });
});
