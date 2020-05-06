/**
 * Handels adding users
 */

const express = require('express');
//use express router
const router = express.Router();
const { check, validationResult } = require('express-validator');

//create route

// @route         POST api/employee/users
// @description   Register user
// @access        Public

//if the access in public you dont need jsonwebtokens (dont require authorizations)
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    //req.body is the object of data that's going be sent
    const errors = validationResult(req);
    //if there are any errors..
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send('employee User route');
  }
);

//export the route
module.exports = router;
