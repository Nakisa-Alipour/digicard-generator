const { Schema, model } = require('mongoose');

const workProfileSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  businessEmail: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  
});

const WorkProfile = model('WorkProfile', workProfileSchema);

module.exports = WorkProfile;