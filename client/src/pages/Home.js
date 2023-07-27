import React from 'react';
//import { ReactDOM } from 'react-dom';
import '../styles/Home.css';

const logoSrc =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png';



const Home = () => {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logoSrc} className="App-logo" alt="logo" />
        <br/>
        <p>
         <code>Welcome to Digicard-Generator</code>!
        </p>
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
export default Home;