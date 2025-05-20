const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const { typeDefs } = require('../src/graphql/schema');
const { resolvers } = require('../src/graphql/resolvers');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    prisma,
    req
  })
});

const handler = async (event, context) => {
  // Convert Netlify event to Express request
  const request = {
    method: event.httpMethod,
    headers: event.headers,
    body: event.body,
    path: event.path
  };

  // Handle the request
  return new Promise((resolve, reject) => {
    server.createHandler()(request, {}, (error, response) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          body: response.body
        });
      }
    });
  });
};

module.exports = { handler }; 