/**
 * Have routes for anything to deal with profiles,
 * fetching them, adding them, updating them
 */
const express = require('express');
//use express router
const router = express.Router();
const auth = require('../../../middleware/auth');

const User = require('../../../models/admin/User');
const Profile = require('../../../models/admin/Profile');

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
    }).populate('admin', ['name', 'avatar']);
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

//export the route
module.exports = router;
