import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthService from './utils/auth';

import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WorkProfile from './pages/WorkProfile';
import CardPreview from './pages/CardPreview';
import UpdateWork from './pages/UpdateWork';
import Download from './pages/Download';
//import './index.css'; // Import global styles if needed

const httpLink = createHttpLink({
  uri: '/graphql',
});


// Create a custom Apollo Link to add the token to the request headers
const authLink = setContext((_, { headers }) => {
  const token = AuthService.getToken(); // Get the token from the AuthService
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Add the token to the 'Authorization' header
    },
  };
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]), // Use the custom Apollo Link with authLink and httpLink
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Header />
          <Routes>
          <Route 
                path="/" 
                element={<Home />} 
            />
          <Route 
                path="/login" 
                element={<Login />} 
              />
          <Route 
                path="/signup" 
                element={<Signup />} 
              />
          <Route 
                path="/me" 
                element={<WorkProfile />} 
              />
          <Route 
                path="/cardpreview/:workProfileId" 
                element={<CardPreview />} 
              />
          <Route 
                path="/download/:workProfileId" 
                element={<Download />} 
              />
          <Route 
                path="/updatework/:workProfileId" 
                element={<UpdateWork />} 
              />
          </Routes>
          
          <Footer />
        
      </Router>
    </ApolloProvider>
  );
}

export default App;

