/**
 * Have routes for anything to deal with profiles,
 * fetching them, adding them, updating them
 */
const express = require('express');
//use express router
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../../../models/Person');
const Profile = require('../../../models/Profile');

const { ObjectId } = require('mongodb'); // or ObjectID
const bcrypt = require('bcryptjs');
const { body } = require('express-validator');

// @route         GET api/profiles/me
// @description   Get current user's profile
// @access        Private

router.get('/me', auth, async (req, res) => {
  try {
    //find profile using id (id taken from token)
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'email', 'isAdmin', 'avatar']);
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

// @route         POST api/profiles
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

// @route         GET api/profiles
// @description   Get all profiles
// @access        Private

router.get('/', auth, async (req, res) => {
  try {
    // check if admin by using token
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'email', 'isAdmin', 'avatar']);

    // Profile does not exist
    if (!profile) {
      return res.status(400).json({ msg: 'No authentication' });
    }
    // Profile exists. Now check if he is an admin
    if (!profile.user.isAdmin) {
      return res.status(400).json({ msg: 'No authentication' });
    }
    //If admin, now he can view all person profiles
    const profiles = await Profile.find().populate('user', [
      'name',
      'avatar',
      'isAdmin',
      'email'
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Below all TODO

// @route         GET api/profiles/:user_id
// @description   Get profile by user id
// @access        Private

router.get('/:user_id', auth, async (req, res) => {
  try {
    // check if admin by finding his profile using token
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['isAdmin', 'email', 'name', 'avatar']);

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
    const profiles = await Profile.findOne({
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
    const profiles = await Profile.findOne({
      user: req.params.user_id,
    });

    // if that particular profile is not found
    if (!profiles) return res.status(400).json({ msg: 'Profile not found' });

    //if found
    // Remove profile
    await Profile.findOneAndRemove({ user: req.params.user_id });
    // Remove User
    await User.findOneAndRemove({ _id: req.params.user_id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route         POST api/profile/password
// @description   Update password
// @access        Private

router.post(
  '/password',
  auth,
  [
    //Using express-validator to validate inputs
    check('currentPassword', 'Current Password is required').not().isEmpty(),
    check(
      'newPassword',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
    body('confirmNewPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Confirmation password does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there is an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //No errors

    let { currentPassword, newPassword, confirmNewPassword } = req.body;

    try {
      let id = req.user.id;

      let o_id = new ObjectId(id); // id as a string is passed

      //We're getting req.user.id from token
      let user = await User.findOne({ _id: o_id });

      if (!user) {
        return res.json({ msg: 'User does not exist' });
      }

      console.log(newPassword);
      console.log(confirmNewPassword);

      //if user exists
      if (newPassword == confirmNewPassword) {
        console.log('newPassword == confirmNewPassword');

        // Check whether the password matches
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
          //Password does not match
          return res
            .status(400)
            .json({ errors: [{ msg: 'Password does not match' }] });
        }
        // password matches
        console.log('password matches');

        const salt = await bcrypt.genSalt(10); //10 is enough as per documentation
        newPassword = await bcrypt.hash(newPassword, salt);
        console.log('newPassword = ' + newPassword);
        user.password = newPassword;
        //Update
        user = await User.findOneAndUpdate(
          { _id: o_id },
          { $set: { password: newPassword } },
          { new: true }
        );
        console.log('Password updated!');
        await user.save();
        return res.json(user);
      } else {
        return res.json({ msg: 'Password does not match' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//export the route
module.exports = router;
