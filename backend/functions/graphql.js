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
  introspection: true,
  playground: true
});

// Create the handler
const handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});

// Export the handler
exports.handler = async (event, context) => {
  // Add CORS headers
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }
  
  return handler(event, context);
}; 