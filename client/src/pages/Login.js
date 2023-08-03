import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

// Define the Login component
const Login = (props) => {
  // State to manage form input values
  const [formState, setFormState] = useState({ email: '', password: '' });
  
  // Use Apollo Client to execute mutation
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the login mutation with form data
      const { data } = await login({
        variables: { ...formState },
      });

      // Log in the user and store the token
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // Clear form values after submission
    setFormState({
      email: '',
      password: '',
    });
  };

  // Render login form and messages
  return (
    <main className= "page">
      <div className="form">
        <div>
          <h2>Login</h2>
          <div>
            {data ? (
              // Display success message and link on successful login
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              // Display login form
              <form onSubmit={handleFormSubmit}>
                <h4 style={{ fontSize: '24px', fontWeight: 'bold', color: '#555', marginBottom: '10px' }}> Welcome back! </h4>
                <label htmlFor="email">Email:</label>
                <input
                  className="form-input"
                  placeholder=" "
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                  className="form-input"
                  placeholder=" "
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <br/>
                <button
                  className="form-button submit-button"
                  style={{ cursor: 'pointer', fontWeight: 'bold', color: 'black', background: 'white'}}
                  type="submit"
                >
                  Login
                </button>
              </form>
            )}

            {error && (
              // Display error message if there is an error
              <div>
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

// Export the Login component
export default Login;
