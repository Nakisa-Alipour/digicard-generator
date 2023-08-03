// Import React and ReactDOM libraries
import React from 'react';
import ReactDOM from 'react-dom';

// Import the main CSS file for styling
import './index.css';

// Import the root component of your application
import App from './App';

// Import the function to report web vitals (performance metrics)
import reportWebVitals from './reportWebVitals';

// Render the root component inside a React.StrictMode wrapper
// This helps catch potential problems in your application during development
ReactDOM.render(
  <React.StrictMode>
    {/* Render your main App component */}
    <App />
  </React.StrictMode>,
  // Mount the application in the HTML element with the id 'root'
  document.getElementById('root')
);

// Call the function to report web vitals
reportWebVitals();
