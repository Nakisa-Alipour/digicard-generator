import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PROFILE } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/Signup.css';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addProfile, { error, data }] = useMutation(ADD_PROFILE);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className= "page">
      <div className="form"> 
        <div>
          <h2>Sign Up</h2>
          <div>
            {data && data.addProfile ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                  className="signup-input" 
                  placeholder=" "
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email:</label>
                <input
                  className="signup-input" 
                  placeholder=" "
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password:</label>
                <input
                  className="signup-input" 
                  placeholder=" "
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="signup-button" 
                  style={{ cursor: 'pointer', fontWeight: 'bold', color: '#555' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && <div>{error.message}</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;



