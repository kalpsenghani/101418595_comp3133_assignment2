const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./database");
const typeDefs = require("./schema/typeDefs");
const userResolver = require("./resolvers/userResolver");
const employeeResolver = require("./resolvers/employeeResolver");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

// CORS configuration
app.use(cors({
  origin: ['https://emp-hub-f.netlify.app', 'http://localhost:4200'],
  credentials: true
}));

const server = new ApolloServer({ 
  typeDefs, 
  resolvers: [userResolver, employeeResolver],
  cors: true
});

server.start().then(() => {
  server.applyMiddleware({ app });
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/graphql`));
});