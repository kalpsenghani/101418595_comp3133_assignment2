const { ApolloServer } = require('apollo-server-lambda');
const connectDB = require('../src/database');
const typeDefs = require('../src/schema/typeDefs');
const userResolver = require('../src/resolvers/userResolver');
const employeeResolver = require('../src/resolvers/employeeResolver');
require('dotenv').config();

// Connect to MongoDB
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolver, employeeResolver],
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
}); 