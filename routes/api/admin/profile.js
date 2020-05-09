/**
 * Have routes for anything to deal with profiles,
 * fetching them, adding them, updating them
 */
const express = require('express');
//use express router
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../../models/admin/User');
const EmployeeUser = require('../../../models/employee/User');
const Profile = require('../../../models/admin/Profile');
const EmployeeProfile = require('../../../models/employee/Profile');

//create route

// @route         GET api/admin/profile/me
// @description   Get current users profile
// @access        Private

/*access is Private, so it's a protected route. 
Thus we add auth here (Should be 2nd parameter)*/

router.get('/me', auth, async (req, res) => {
  try {
    //find profile using id (id taken from token)
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    // Profile does not exist
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    // Profile exists
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route         POST api/admin/profile
// @description   Create or update user profile
// @access        Private

router.post(
  '/',
  [auth, [check('status', 'Career status is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    //if there is an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //No errors

    const {
      location,
      status,
      bio,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      //We're getting req.user.id from token
      let profile = await Profile.findOne({ user: req.user.id });

      //if profile exists
      if (profile) {
        //Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //if profile not exist then CREATE it
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route         GET api/admin/profile
// @description   Get all profiles
// @access        Private

router.get('/', auth, async (req, res) => {
  try {
    // check if admin by finding his profile using token
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['isAdmin']);

    // Profile does not exist
    if (!profile) {
      return res.status(400).json({ msg: 'No authentication' });
    }
    // Profile exists. Now check if he is an admin
    console.log(profile.user.isAdmin);
    //Not an admin
    if (!profile.user.isAdmin) {
      return res.status(400).json({ msg: 'No authentication' });
    }
    //If admin, now he can view all employee profiles
    const profiles = await EmployeeProfile.find().populate('user', [
      'name',
      'avatar',
      'isAdmin',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route         GET api/admin/profile/user/:user_id
// @description   Get profile by user id
// @access        Private

router.get('/user/:user_id', auth, async (req, res) => {
  try {
    // check if admin by finding his profile using token
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['isAdmin']);

    // Profile does not exist
    if (!profile) {
      return res.status(400).json({ msg: 'No authentication' });
    }
    // Profile exists. Now check if he is an admin
    console.log(profile.user.isAdmin);
    //Not an admin
    if (!profile.user.isAdmin) {
      return res.status(400).json({ msg: 'No authentication' });
    }
    //If admin, now he can view employee profile by user id
    const profiles = await EmployeeProfile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar', 'isAdmin']);

    // if that particular profile is not found
    if (!profiles) return res.status(400).json({ msg: 'Profile not found' });

    //if found
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route         DELETE api/admin/profile/user/:user_id
// @description   Delete profile & user
// @access        Private

router.delete('/user/:user_id', auth, async (req, res) => {
  try {
    // check if admin by finding his profile using token
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['isAdmin']);

    // Profile does not exist
    if (!profile) {
      return res.status(400).json({ msg: 'No authentication' });
    }
    // Profile exists. Now check if he is an admin
    console.log(profile.user.isAdmin);
    //Not an admin
    if (!profile.user.isAdmin) {
      return res.status(400).json({ msg: 'No authentication' });
    }
    //If admin, now he can delete employee
    const profiles = await EmployeeProfile.findOne({
      user: req.params.user_id,
    });

    // if that particular profile is not found
    if (!profiles) return res.status(400).json({ msg: 'Profile not found' });

    //if found
    // Remove profile
    await EmployeeProfile.findOneAndRemove({ user: req.params.user_id });

    // Remove User
    await EmployeeUser.findOneAndRemove({ _id: req.params.user_id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

//export the route
module.exports = router;
