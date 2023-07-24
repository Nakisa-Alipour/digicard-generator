const { gql } = require('apollo-server-express');

const typeDefs = gql` {
    type Profile {
        _id: ID
        username: String!
        email: String!
        password: String!
        workProfile: [WorkProfile]
      }
    type WorkProfile {
        _id: ID!
        fullName: String!
        businessEmail: String!
        jobTitle: String!
        companyName: String!
        address: String!
        phoneNumber: String!
    }
    type Auth {
        token: ID!
        profile: Profile
    }

    type Query {
        # Get all user profiles
        Profile: [Profile]

        # Get a user profile by ID
        Profile(id: ID!): Profile

        Workprofile(id: ID!): WorkProfile

        # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
        me: Profile

    }

    type Mutation {
        addProfile(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    
        addWorkProfile(profileId: ID!, fullName: String!, businessEmail: String!, jobTitle: String!, companyName: String!, address: String!, phoneNumber: String!): WorkProfile
        updateWorkProfile(id: ID!, fullName: String!, businessEmail: String!, jobTitle: String!, companyName: String!, address: String!, phoneNumber: String!): WorkProfile
        deleteWorkProfile(id: ID!): WorkProfile
      }
}`;

module.exports = typeDefs;