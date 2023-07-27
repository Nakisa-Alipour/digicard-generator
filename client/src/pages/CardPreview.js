
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_WORK_PROFILE } from '../utils/queries';
import { Link, useParams } from 'react-router-dom';
const CardPreview = () => {
    // Fetch the logged-in user's information using the QUERY_ME query
    const { workProfileId } = useParams();
    const { loading, data } = useQuery(QUERY_WORK_PROFILE, {
      variables: {
        id: workProfileId
      }
    });
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    // Destructure the user data from the response
    console.log(data);
    const { workProfile } = data;
  
    return (
      <div>
        <h2>Card Preview</h2>
        <div>
          <h3>Full Name: {workProfile.fullName}</h3>
          <p>Business Email: {workProfile.businessEmail}</p>
          <p>Job Title: {workProfile.jobTitle}</p>
          <p>Company Name: {workProfile.companyName}</p>
          <p>Address: {workProfile.address}</p>
          <p>Phone Number: {workProfile.phoneNumber}</p>
        </div>
  
        <Link to="/me">Back to Work Profile</Link>
      </div>
    );
  };
  
  export default CardPreview;
  