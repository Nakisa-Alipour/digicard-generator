import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WorkProfile from './pages/WorkProfile';
//import './index.css'; // Import global styles if needed

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
          </Routes>
          
          <Footer />
        
      </Router>
    </ApolloProvider>
  );
}

export default App;



/*

Routes, Route
<div >
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
                path="/existing-profiles/:Id" 
                element={<CardPreview />} 
              />
              <Route 
                path="/WorkProfile/:Id/QR" 
                element={<ScannedQR />} 
              />
            </Routes>
          </div>
          <Footer />

  NOTE: npm install jwt-decode
*/