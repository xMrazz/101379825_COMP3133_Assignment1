const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const startServer = async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/comp3133_assigment1';
  await mongoose.connect(mongoUri);

  app.listen(4000, () => console.log('Server running on http://localhost:4000' + apolloServer.graphqlPath));
};

startServer();