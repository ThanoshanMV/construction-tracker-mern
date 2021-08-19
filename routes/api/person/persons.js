/**
 * API to manage person queries
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

 //Bring down the Person model
 const User = require('../../../models/Person');
 
 
 // @route         POST api/persons
 // @description   Register Person
 // @access        Private
 
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
     // if there are any errors
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     // block non-admins from registering new persons
     if (!req.user.isAdmin) {
      return res.status(401).json({ msg: 'Authorization denied' });
     }

     /**
      * req.body is the object of data that's going be sent.
      * So we can access req.body.name , req.body.email and so on. Instead
      * of accessing them one by one, we can do like this below..
      * */
     const { name, email, password, isAdmin } = req.body;
 
     /*We're using async, so we must wrap our code inside try-catch block and await.
      * Anything that return a promise make sure to put async before
      */
 
     try {
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
         isAdmin
       });
 
       //Encrypt password
       const salt = await bcrypt.genSalt(10); //10 is enough as per documentation
       user.password = await bcrypt.hash(password, salt);

       //save user instance to database
       await user.save();
 
       // generate the jsonwebtoken
       const payload = {
         user: {
           id: user.id,
           isAdmin: user.isAdmin
         }
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
 
 // @route         POST api/persons/test
 // @description   Register Person - Admin (For DEV only. Should be deleted when deploying)
 // @access        Public
 
 router.post(
  '/test',
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
    // if there are any errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isAdmin } = req.body;

    try {
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
        isAdmin
      });

      //Encrypt password
      const salt = await bcrypt.genSalt(10); //10 is enough as per documentation
      user.password = await bcrypt.hash(password, salt);

      //save user instance to database
      console.log("Saved User :" + user);
      await user.save();

      // generate the jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          isAdmin: user.isAdmin
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
 