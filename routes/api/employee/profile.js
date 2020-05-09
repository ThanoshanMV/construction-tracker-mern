/**
 * Have routes for anything to deal with profiles,
 * fetching them, adding them, updating them
 */
const express = require('express');
//use express router
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../../models/employee/User');
const Profile = require('../../../models/employee/Profile');

//create route

// @route         GET api/employee/profile/me
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

// @route         DELETE api/employee/profile
// @description   Delete profile & user
// @access        Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//export the route
module.exports = router;
