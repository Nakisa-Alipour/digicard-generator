import { gql } from '@apollo/client';

// Mutation to add a new profile
export const ADD_PROFILE = gql`
  mutation addProfile($username: String!, $email: String!, $password: String!) {
    addProfile(username: $username, email: $email, password: $password) {
      token
      profile {
        _id
        username
        
      }
    }
  }
`;

// Mutation to log in and get an authentication token
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        username
        
      }
    }
  }
`;
/*
// Mutation to add a new work profile
export const ADD_WORK_PROFILE = gql`
  mutation addWorkProfile(
    $profileId: ID!
    $fullName: String!
    $businessEmail: String!
    $jobTitle: String!
    $companyName: String!
    $address: String!
    $phoneNumber: String!
  ) {
    addWorkProfile(
      profileId: $profileId
      fullName: $fullName
      businessEmail: $businessEmail
      jobTitle: $jobTitle
      companyName: $companyName
      address: $address
      phoneNumber: $phoneNumber
    ) {
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



// Mutation to update an existing work profile
export const UPDATE_WORK_PROFILE = gql`
  mutation updateWorkProfile(
    $id: ID!
    $fullName: String
    $businessEmail: String
    $jobTitle: String
    $companyName: String
    $address: String
    $phoneNumber: String
  ) {
    updateWorkProfile(
      id: $id
      fullName: $fullName
      businessEmail: $businessEmail
      jobTitle: $jobTitle
      companyName: $companyName
      address: $address
      phoneNumber: $phoneNumber
    ) {
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

// Mutation to delete an existing work profile
export const DELETE_WORK_PROFILE = gql`
  mutation deleteWorkProfile($id: ID!) {
    deleteWorkProfile(id: $id) {
      _id
      fullName
    }
  }
`;
*/
