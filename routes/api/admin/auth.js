/**
 * Getting jsonwebtoken for authentication
 */

const express = require('express');
//use express router
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

//Get the auth middleware
const auth = require('../../../middleware/auth');

const User = require('../../../models/admin/User');

//create route

// @route         GET api/admin/auth
// @description   Protected route
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

// @route         POST api/admin/auth
// @description   Authenticate admin & get token
// @access        Public

router.post(
  '/',
  [
    //Using express-validator to validate inputs
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are any errors..
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    /**
     * req.body is the object of data that's going be sent.
     * So we can access req.body.name , req.body.email and so on. Instead
     * of accessing them one by one, we can do like this below..
     * */
    const { email, password } = req.body;

    /*We're using async, so we must wrap our code inside try-catch block and await.
     * Anything that return a promise make sure to put async before
     */

    try {
      //See if user exists
      let user = await User.findOne({ email });

      if (!user) {
        //User does not exist
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //User exists

      // Check whether the password matches
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        //Password does not match
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      //Password matches

      //Create payload

      const payload = {
        user: {
          id: user.id,
        },
      };

      //Generate token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 }, //expires in 360000 seconds
        (err, token) => {
          if (err) throw err;
          res.json({ token }); // Send the token to the client
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//export the route
module.exports = router;
