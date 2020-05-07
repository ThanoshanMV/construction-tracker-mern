/**
 * Getting jsonwebtoken for authentication
 */

const express = require('express');
//use express router
const router = express.Router();
//Get the auth middleware
const auth = require('../../../middleware/auth');

const User = require('../../../models/employee/User');

//create route

// @route         GET api/employee/auth
// @description   Test route
// @access        Public

//We can add auth middleware as a second parameter.
//By adding that we can make our route as private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//export the route
module.exports = router;
