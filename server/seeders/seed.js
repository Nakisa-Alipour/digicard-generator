const db = require('../config/connection');
const { Profile, WorkProfile } = require('../models');
const profileSeeds = require('./profileSeeds.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await WorkProfile.deleteMany({});
    
    //await Profile.create(profileSeeds);
    // Create WorkProfile documents and get their ObjectIds
    const workProfiles = await WorkProfile.create(profileSeeds.flatMap(profile => profile.workProfile));

    // Create Profile documents using the generated WorkProfile ObjectIds
    const profiles = profileSeeds.map(profile => ({
      username: profile.username,
      email: profile.email,
      password: profile.password,
      workProfile: profile.workProfile.map((_, index) => workProfiles[index]._id),
    }));

    await Profile.create(profiles);

    
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});