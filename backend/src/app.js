const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./database");
const typeDefs = require("./schema/typeDefs");
const userResolver = require("./resolvers/userResolver");
const employeeResolver = require("./resolvers/employeeResolver");
require("dotenv").config();

const app = express();
connectDB();

const server = new ApolloServer({ typeDefs, resolvers: [userResolver, employeeResolver] });
server.start().then(() => {
  server.applyMiddleware({ app });
  app.listen(4000, () => console.log("Server running at http://localhost:4000/graphql"));
});
