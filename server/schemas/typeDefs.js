const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    username: String!
    email: String!
    password: String!
    workProfile: [WorkProfile]
  }

  type WorkProfile {
    _id: ID
    fullName: String!
    businessEmail: String!
    jobTitle: String!
    companyName: String!
    address: String!
    phoneNumber: String!
    profile: Profile @deprecated
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    Profiles: [Profile]
    Profile(id: ID!): Profile
    WorkProfile(id: ID!): WorkProfile
    me: Profile
  }

  type Mutation {
    addProfile(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addWorkProfile(profileId: ID!, fullName: String!, businessEmail: String!, jobTitle: String!, companyName: String!, address: String!, phoneNumber: String!): WorkProfile
    updateWorkProfile(id: ID!, fullName: String!, businessEmail: String!, jobTitle: String!, companyName: String!, address: String!, phoneNumber: String!): WorkProfile
    deleteWorkProfile(id: ID!): WorkProfile
  }
`;

module.exports = typeDefs;
