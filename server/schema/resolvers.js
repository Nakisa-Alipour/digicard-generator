const { AuthenticationError } = require('apollo-server-express');
const Profile = require('./models/Profile');
const WorkProfile = require('./models/WorkProfile');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      // Retrieve all user profiles from the database
      const profiles = await Profile.find();
      return profiles;
    },
    profile: async (parent, { id }) => {
      // Retrieve a user profile by ID from the database
      const profile = await Profile.findById(id);
      return profile;
    },
    workProfile: async (parent, { id }) => {
      // Retrieve a work profile by ID from the database
      const workProfile = await WorkProfile.findById(id);
      return workProfile;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        // Fetch the profile of the authenticated user based on the _id in context.user
        return Profile.findOne({ _id: context.user._id });
      }
      // Throw an AuthenticationError if no user is authenticated
      throw new AuthenticationError('You need to be logged in!');
    },
    
  },
  Mutation: {
    addProfile: async (parent, { username, email, password }) => {
      // Create a new user profile in the database
      const profile = await Profile.create({ username, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },
    addWorkProfile: async (parent, { profileId, fullName, businessEmail, jobTitle, companyName, address, phoneNumber },context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        const workProfile = await WorkProfile.create({
          fullName,
          businessEmail,
          jobTitle,
          companyName,
          address,
          phoneNumber,
        });

        const profile = await Profile.findById(profileId);
        profile.workProfile.push(workProfile._id);

        // Save the updated profile after adding the new workProfile
        await profile.save();

        return workProfile;
        
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
      
    },
    updateWorkProfile: async (parent, { id, fullName, businessEmail, jobTitle, companyName, address, phoneNumber }, context) => {
      if (context.user) {
        // Find the work profile by ID
        const workProfile = await WorkProfile.findById(id);
        if (!workProfile) {
          throw new Error('Work profile not found');
        }

        // Update the work profile fields if they are provided in the mutation arguments
        if (fullName) {
          workProfile.fullName = fullName;
        }
        if (businessEmail) {
          workProfile.businessEmail = businessEmail;
        }
        if (jobTitle) {
          workProfile.jobTitle = jobTitle;
        }
        if (companyName) {
          workProfile.companyName = companyName;
        }
        if (address) {
          workProfile.address = address;
        }
        if (phoneNumber) {
          workProfile.phoneNumber = phoneNumber;
        }

        // Save the updated work profile
        await workProfile.save();

        return workProfile;
      }

      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteWorkProfile: async (parent, { id }, context) => {
      if (context.user) {
        // Find the work profile by ID
        const workProfile = await WorkProfile.findById(id);
        if (!workProfile) {
          throw new Error('Work profile not found');
        }

        // Find the associated user profile and remove the workProfile reference
        const profile = await Profile.findById(workProfile.profileId);
        profile.workProfile.pull(workProfile._id);
        await profile.save();

        // Delete the work profile
        await workProfile.remove();

        return workProfile;
      }

      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
