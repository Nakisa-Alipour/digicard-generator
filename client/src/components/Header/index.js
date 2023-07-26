import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import '../../styles/Header.css';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo-link">
          <h1 className="logo">Digicard-Generator</h1>
        </Link>
        <div className="menu">
          {Auth.loggedIn() ? (
            <>
              <Link to="/me" className="menu-link">
                View My Profile
              </Link>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="menu-link">
                Login
              </Link>
              <Link to="/signup" className="menu-link">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;



/*


*/
