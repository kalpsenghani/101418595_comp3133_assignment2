const { ApolloServer } = require('apollo-server-lambda');
const { PrismaClient } = require('@prisma/client');
const connectDB = require('../src/database');
const typeDefs = require('../src/schema/typeDefs');
const userResolver = require('../src/resolvers/userResolver');
const employeeResolver = require('../src/resolvers/employeeResolver');
require('dotenv').config();

// Initialize Prisma Client
const prisma = new PrismaClient();

// Connect to MongoDB
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers: [userResolver, employeeResolver],
  context: ({ event, context }) => ({
    prisma,
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
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
});

// Export the handler
exports.handler = async (event, context) => {
  // Add CORS headers
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.CORS_ORIGIN || '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
      },
      body: '',
    };
  }
  
  return handler(event, context);
}; 