const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Create a new Apollo server instance, passing the typeDefs and resolvers, and use the authMiddleware as the context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});


// Parse incoming JSON data and URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// If in production, serve the static build folder from React
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Route to serve the React app's index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Start the Apollo server and listen on the specified port
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  
  // Connect to the MongoDB database
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer();