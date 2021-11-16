/**
 * Handels adding users
 */

const express = require('express');
//use express router
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const auth = require('../../../middleware/auth');

//Bring down the User model
const User = require('../../../models/employee/User');
//Admin model
const Admin = require('../../../models/admin/User');

//create route

// @route         POST api/employee/users
// @description   Register user
// @access        Private (ONLY Admin can add users)

router.post(
  '/',
  auth,
  [
    //Using express-validator to validate inputs
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
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
    const { name, email, password } = req.body;

    /*We're using async, so we must wrap our code inside try-catch block and await.
     * Anything that return a promise make sure to put async before
     */

    try {
      // check if admin by finding his id using token
      const adminUser = await Admin.findOne({
        _id: req.user.id,
      });

      // Profile does not exist
      if (!adminUser) {
        return res.status(400).json({ msg: 'No authentication !!' });
      }
      // Profile exists. Now check if he is an admin
      console.log(adminUser.isAdmin);
      //Not an admin
      if (!adminUser.isAdmin) {
        return res.status(400).json({ msg: 'No authentication' });
      }
      //If admin, now he can register employees
      //See if user exists
      let user = await User.findOne({ email });

      if (user) {
        //user exists
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      //User does not exist

      //Get user gravatar
      const avatar = gravatar.url(email, {
        s: '200', //s = size
        r: 'pg', //r = rating (PG Rating)
        d: 'mm', //Default User icon
      });

      //Create an instance of user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10); //10 is enough as per documentation
      user.password = await bcrypt.hash(password, salt);

      //save user instance to database
      await user.save();

      // question: do we need to create token once the admin register a new user?
      const payload = {
        user: {
          id: user.id,
          isAdminJWT: false
        },
      };

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
