import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
const CardPreview = () => {
    // Fetch the logged-in user's information using the QUERY_ME query
    const { loading, data } = useQuery(QUERY_ME);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Destructure the user data from the response
    console.log(data);
    const { me } = data;
  
    return (
      <div>
        <h2>Card Preview</h2>
        <div>
          <h3>Full Name: {me.fullName}</h3>
          <p>Business Email: {me.businessEmail}</p>
          <p>Job Title: {me.jobTitle}</p>
          <p>Company Name: {me.companyName}</p>
          <p>Address: {me.address}</p>
          <p>Phone Number: {me.phoneNumber}</p>
        </div>
  
        <Link to="/me">Back to Work Profile</Link>
      </div>
    );
  };
  
  export default CardPreview;
  