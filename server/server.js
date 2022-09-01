const express = require('express');
const { ApolloServer } = require('apollo-server-express'); //import ApolloServer
const {typeDefs, resolvers } = require('./schemas'); //import typeDefs and resolvers
const { authMiddleware } = require('./utils/auth');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const server = new ApolloServer({ // create new Apollo server and pass schema data
  typeDefs,
  resolvers,
  context: authMiddleware // JWT auth headers - allows resolver to have headers become "context" parameter
});

const app = express();

server.applyMiddleware({app});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
