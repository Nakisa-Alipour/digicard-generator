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

/*
Directory Structure:

client
  /public
    /index.html
  /src
    /components
      /Footer
        /index.js
      /Header
        /index.js
      /WorkProfileForm
        /index.js
      /WorkProfileList
        /index.js
    /pages
      /CardPreview.js
      /Home.js
      /Login.js
      /Signup.js
      /ScannedQR.js
      /WorkProfile.js
    /style
    /utils
      /auth.js
      /mutations.js
      /queries.js
    /App.js
    /index.js
    /index.css
    /reportWebVitals.js
  /.gitignore
  /package.json

server
  /config
    /connection.js
  /models
    /index.js
    /Profile.js
    /WorkProfile.js
  /schema
    /index.js
    /resolvers.js
    /typeDefs.js
  /seeders
    /profileSeeds.js
    /seed.js
  /utils
    /auth.js
  /server.js
  /package.json

package.json

.gitignore

Readme 

*/

/*
acceptence criteria:


as a user, 
when I go to the "Home" page
then I see a pge with a login and signup options in the header

when I click on login  in Home page,
then "Login" page will apear to enter email and password with "login" button

when I click on signup in Home page
then "Signup" page will apear to enter username, email and password  with "signin" button

when I add information in "Login" page and click on "login" button,
then I can see my "WorkProfile" page includes, "Existing Profiles" and "New Details" sections

when I add information in "Signup" page and click on "Signup" button,
then I can see my "WorkProfile" page includes, vacant "Existing Profiles" and "New Details" sections

when I log into my "WorkProfile" page,
then in the "existing profiles" section, there are link/s to existing profile/s and also with removing option

when I sign up or login into my "WorkProfile" page,
then in the "New Details" scetion, I can enter details: Full name, Email, Address, Job Title, Phone and Company which can be 
saved and go to the next page by clicking on "Save and Next" button. 

when click on "Save and Next" button in the "WorkProfile" page,
then I can see "CardPreview" page with entered information and created QR code 
and also I will be able to logout from the application


when QR code has been scanned,
then the user's "ScannedQR" page will appear and the user's information can be saved in the contact list by
generating vcf file to be downloaded to phone

*/
