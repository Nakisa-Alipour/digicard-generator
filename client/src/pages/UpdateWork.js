import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_WORK_PROFILE } from '../utils/queries';
import { UPDATE_WORK_PROFILE } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import '../styles/UpdateWork.css';

const UpdateWork = () => {
  const { workProfileId } = useParams();

  const { loading, data, error: queryError } = useQuery(QUERY_WORK_PROFILE, {
    variables: {
      id: workProfileId,
    },
  });

  const [updateWorkProfile, { error: updateError }] = useMutation(UPDATE_WORK_PROFILE);

  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    jobTitle: '',
    companyName: '',
    address: '',
    phoneNumber: '',
  });

  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);

  useEffect(() => {
    if (data && data.workProfile) {
      const { fullName, businessEmail, jobTitle, companyName, address, phoneNumber } = data.workProfile;

      // Set the default form data using the existing work profile data
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await updateWorkProfile({
        variables: { 
          updateWorkProfileId: workProfileId, 
          ...formData 
        },
      });
    
      console.log('Updated work profile added:', data.updateWorkProfile);
    

      setIsUpdateSuccessful(true);
    } catch (err) {
      console.error(err.message);
      console.error(err.graphQLErrors);
      console.error(err.networkError);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  //const { workProfile } = data;

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
            <button type="submit">Update Work Profile</button>
          </form>
          {queryError && <div>Error fetching work profile data.</div>}
          {updateError && <div>Error updating work profile.</div>}
        </div>
      )}
    </div>
  );
};

export default UpdateWork;
