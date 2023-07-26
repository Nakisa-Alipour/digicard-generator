import { gql } from '@apollo/client';

// Query to get all user profiles
export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      username
      email
      workProfile {
        _id
        fullName
        businessEmail
        jobTitle
        companyName
        address
        phoneNumber
      }
    }
  }
`;

// Query to get a single user profile by ID
export const QUERY_PROFILE = gql`
  query singleProfile($id: ID!) {
    profile(id: $id) {
      _id
      username
      email
      workProfile {
        _id
        fullName
        businessEmail
        jobTitle
        companyName
        address
        phoneNumber
      }
    }
  }
`;

// Query to get the authenticated user's profile
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      workProfile {
        _id
        fullName
        businessEmail
        jobTitle
        companyName
        address
        phoneNumber
      }
    }
  }
`;

// Query to get a single work profile by ID
export const QUERY_WORK_PROFILE = gql`
  query getWorkProfile($id: ID!) {
    workProfile(id: $id) {
      _id
      fullName
      businessEmail
      jobTitle
      companyName
      address
      phoneNumber
    }
  }
`;
