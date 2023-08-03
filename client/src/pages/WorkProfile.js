// Import necessary libraries and components
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import WorkProfileList from '../components/WorkProfileList';
import WorkProfileForm from '../components/WorkProfileForm';
import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import '../styles/WorkProfile.css';

// Define the Profile component
const Profile = () => {
  // Get the `profileId` from URL parameters using `useParams()`
  const { profileId } = useParams();

  // Execute the appropriate query based on the presence of `profileId`
  const { loading, data } = useQuery(
    profileId ? QUERY_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Extract the profile data from the query result
  const profile = data?.me || data?.profile || {};

  // Convert the `workProfile` object to an array
  const workProfileArray = Object.values(profile.workProfile || {});

  // Use React Router's `<Navigate />` component to redirect if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not logged in or no profile is found, show appropriate message
  if (!profile?.username) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  // Render the profile content
  return (
    <main style={{ background: 'linear-gradient(to bottom, #081947, #074257, #cce7eb)' }}>
      <h2 style={{ paddingTop: "10px", color: 'white' }}>Welcome to your work profile!</h2>
      <br />
      {workProfileArray.length > 0 ? (
        <WorkProfileList
          workProfile={workProfileArray}
          isLoggedInUser={!profileId && true}
        />
      ) : (
        <p>No work profiles found.</p>
      )}

      <div className='work-form'>
        <h2 style={{ margin: "0 auto", color: 'white' }}>Create new work profile</h2>
        <br />
        <WorkProfileForm profileId={profile._id} />
      </div>
    </main>
  );
};

// Export the Profile component
export default Profile;
