import React from 'react';
import '../styles/Home.css';

// URL of the React logo image
const logoSrc =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png';

// Define the Home component
const Home = () => {
  return (
    <div className="App">
      {/* Header section */}
      <header className="App-header">
        {/* Display the React logo */}
        <img src={logoSrc} className="App-logo" alt="logo" />
        <br />
        {/* Display a welcome message */}
        <p>
          <code>Welcome to Digicard-Generator</code>!
        </p>
        {/* Link to React documentation */}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built with React
        </a>
      </header>
    </div>
  );
};

// Export the Home component
export default Home;
