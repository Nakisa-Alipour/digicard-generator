// Import necessary libraries and components
import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_WORK_PROFILE } from '../utils/queries';
import { UPDATE_WORK_PROFILE } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import '../styles/UpdateWork.css';

// Define the UpdateWork component
const UpdateWork = () => {
  // Get the `workProfileId` from URL parameters using `useParams()`
  const { workProfileId } = useParams();

  // Execute the `QUERY_WORK_PROFILE` query to fetch the work profile data
  const { loading, data, error: queryError } = useQuery(QUERY_WORK_PROFILE, {
    variables: {
      id: workProfileId,
    },
  });

  // Use the `UPDATE_WORK_PROFILE` mutation to update the work profile
  const [updateWorkProfile, { error: updateError }] = useMutation(UPDATE_WORK_PROFILE);

  // Set up state to manage form data and update success status
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    jobTitle: '',
    companyName: '',
    address: '',
    phoneNumber: '',
  });
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

  // Set initial form data using fetched work profile data
  useEffect(() => {
    if (data && data.workProfile) {
      const { fullName, businessEmail, jobTitle, companyName, address, phoneNumber } = data.workProfile;

      setFormData({
        fullName,
        businessEmail,
        jobTitle,
        companyName,
        address,
        phoneNumber,
      });
    }
  }, [data]);

  // Handle input change in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission to update the work profile
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the `updateWorkProfile` mutation with the updated data
      const { data } = await updateWorkProfile({
        variables: { 
          updateWorkProfileId: workProfileId, 
          ...formData 
        },
      });

      console.log('Updated work profile:', data.updateWorkProfile);

      setIsUpdateSuccessful(true);
    } catch (err) {
      console.error(err.message);
      console.error(err.graphQLErrors);
      console.error(err.networkError);
    }
  };

  // Render content based on loading and update status
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isUpdateSuccessful ? (
        <div className="update-success-message">
          <h2>Work Profile Updated Successfully!</h2>
          <h4 className='updated-card'>
            Click <a href={`/cardpreview/${workProfileId}`}>here</a> to view the updated work profile.
          </h4>
        </div>
      ) : (
        <div className="update-form">
          <h2>Update Work Profile</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="businessEmail">Business Email</label>
              <input type="text" name="businessEmail" value={formData.businessEmail} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="jobTitle">Job Title</label>
              <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="companyName">Company Name</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
            </div>
            <button className="update-button" type="submit">Update Work Profile</button>
          </form>
          {queryError && <div>Error fetching work profile data.</div>}
          {updateError && <div>Error updating work profile.</div>}
        </div>
      )}
    </div>
  );
};

// Export the UpdateWork component
export default UpdateWork;

/*


*/
