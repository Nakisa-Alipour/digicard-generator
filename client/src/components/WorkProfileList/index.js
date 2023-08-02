import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_WORK_PROFILE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';
import { Link } from 'react-router-dom';
import '../../styles/WorkProfileList.css'; 

const WorkProfileList = ({ workProfile, isLoggedInUser = false }) => {
  
  const [deleteWorkProfile, { error }] = useMutation(DELETE_WORK_PROFILE, {
    update(cache, { data: { deleteWorkProfile } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: deleteWorkProfile },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleDeleteWorkProfile = async (id) => {
    try {
      const { data } = await deleteWorkProfile({
        variables: { id },
      });
    } catch (err) {
      console.error(err);
    }
  };

  
  if (!workProfile.length) {
    return <h3>No Work Profile Yet</h3>;
  }

  return (
    <div className="work-profile-list-container">
      {isLoggedInUser && <h4> {workProfile[0].fullName}'s Work Profile:</h4>}
      <br/>
      <ul className="work-profile-list">
        {workProfile.map((profile) => (
          <li key={profile._id} className="work-profile-item">
            <div className="card1">
              <span className="work-profile-label">Job Title:</span> {profile.jobTitle}
            </div>
            <div className="card1 card-link">
              <Link className="card-link" to={`/cardpreview/${profile._id}`}>Business Card Preview</Link>
            </div>
            <div className="card1 card-link">
              <Link className="card-link" to={`/download/${profile._id}`}>Card Preview & Download</Link>
            </div>
            <div className="card1">
            
              {isLoggedInUser && (
                <button className="delete-button" onClick={() => handleDeleteWorkProfile(profile._id)}>
                  Delete
                </button>
              )}
            </div>
            <div>
            {isLoggedInUser && (
                <Link className="update-button" to={`/updatework/${profile._id}`}>
                  Update
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
      {error && <div>{error.message}</div>}
    </div>
  );
};

export default WorkProfileList;

