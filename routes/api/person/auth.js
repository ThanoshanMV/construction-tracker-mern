/**
 * Person login and get person information on visit to route.
 */

 const express = require('express');
 //use express router
 const router = express.Router();
 const { check, validationResult } = require('express-validator');
 const jwt = require('jsonwebtoken');
 const config = require('config');
 const bcrypt = require('bcryptjs');
 
 const auth = require('../../../middleware/auth');
 const User = require('../../../models/Person');
 
 // @route         GET api/auth
 // @description   Retrieve person information based on token
 // @access        Private
 
 router.get('/', auth, async (req, res) => {
   try {
     // get all user data except for password
     const user = await User.findById(req.user.id).select('-password');
     res.json(user);
   } catch (err) {
     console.error(err.message);
     res.status(500).send('Server Error');
   }
 });
 
 // @route         POST api/auth
 // @description   Authenticate person & get token (Login)
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
 
       //Password matches. All good to login
 
       // Generate token
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
 
 //export the route
 module.exports = router;
 