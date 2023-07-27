import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_WORK_PROFILE } from '../../utils/mutations';
import '../../styles/WorkProfileForm.css'; // Import the CSS file

import Auth from '../../utils/auth';

const AddWorkProfileForm = ({ profileId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    jobTitle: '',
    companyName: '',
    address: '',
    phoneNumber: '',
  });

  const [addWorkProfile, { error }] = useMutation(ADD_WORK_PROFILE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addWorkProfile({
        variables: { profileId, ...formData },
      });

      // You can handle any success actions here, such as showing a success message
      console.log('New work profile added:', data.addWorkProfile);

      // Reset the form fields after successful submission
      setFormData({
        fullName: '',
        businessEmail: '',
        jobTitle: '',
        companyName: '',
        address: '',
        phoneNumber: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="add-work-profile-form-container">
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessEmail">Business Email</label>
            <input
              type="email"
              id="businessEmail"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleInputChange}
              placeholder="Enter your business email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Enter your job title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Enter your company name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <button type="submit">Add New Work Profile</button>
          </div>

          {error && <div className="error-message">{error.message}</div>}
        </form>
      ) : (
        <p>
          You need to be logged in to add a work profile. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default AddWorkProfileForm;