import React from 'react';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import WorkProfileList from '../components/WorkProfileList';
import WorkProfileForm from '../components/WorkProfileForm';

import { QUERY_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
//import '../styles/WorkProfile.css'

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Convert the workProfile object to an array
  const workProfileArray = Object.values(profile.workProfile || {});

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.username) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <main style={{ background: 'linear-gradient(to bottom, #081947, #074257, #cce7eb)' }}>
      <h2 style={{color: 'white'}}>Welcome to your work profile!</h2>
      {workProfileArray.length > 0 ? (
        <WorkProfileList
          workProfile={workProfileArray}
          isLoggedInUser={!profileId && true}
        />
      ) : (
        <p>No work profiles found.</p>
      )}
      
      <div>
      <h4 style={{color: 'white'}}>Please fill out the form below to create new work profile</h4>
      <br/>
        <WorkProfileForm profileId={profile._id} />
      </div>
    </main>
  );
};

export default Profile;