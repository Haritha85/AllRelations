const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql');
 
// Sample in-memory data
let Users = [
  { id: '1', name: 'user 1' },
  { id: '2', name: 'user 2' },
  { id: '3', name: 'user 3' },
];
 
// GraphQL Object Type for Item
const usertype = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});
 
// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Retrieve all items
    Users: {
      type: new GraphQLList(usertype),
      resolve() {
        return Users;
      },
    },
    // Retrieve a specific item by ID
    Users: {
      type: usertype,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return Users.find(user => user.id === args.id);
      },
    },
  },
});
 
// Mutation
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // Create a new item
    adduser: {
      type: usertype,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const newuser = { id: String(Users.length + 1), name: args.name };
        Users.push(newuser);
        return newuser;
      },
    },
    // Update an item by ID
    updateuser: {
      type: usertype,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        const user = Users.find(user => user.id === args.id);
        if (!user) throw new Error('user not found');
        if (args.name) user.name = args.name;
        return user;
      },
    },
    // Delete an item by ID
    deleteuser: {
      type: usertype,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const index = Users.findIndex(user => user.id === args.id);
        if (index === -1) throw new Error('Item not found');
        const deleteduser = Users.splice(index, 1)[0];
        return deleteduser;
      },
    },
  },
});
 
// Create a GraphQL schema
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
 
// Create an Express server
const app = express();
 
// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true, // Enable GraphiQL interface for testing in the browser
}));
 
// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/graphql`);
});