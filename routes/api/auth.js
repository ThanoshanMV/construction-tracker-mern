/**
 * For email purpose
 */
const express = require('express');
//use express router
const router = express.Router();
//we need to bring in config package to access username & password inside config
const config = require('config');
//get mongoURI value
const username = config.get('user');
const password = config.get('pass');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');

// Models
const Admin = require('../../models/admin/User');
const User = require('../../models/employee/User');

const crypto = require('crypto');

// @route         POST api/reset-password
// @description   reset password
// @access        Public

router.post(
  '/reset-password',
  [
    //Using express-validator to validate inputs
    check('email', 'Please include a valid email').isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //if there are any error associated with invalid email issues
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
      }
      const token = buffer.toString('hex');

      /**
       * req.body is the object of data that's going be sent.
       * So we can access req.body.name , req.body.email and so on. Instead
       * of accessing them one by one, we can do like this below..
       * */
      const { email } = req.body;

      let admin = await Admin.findOne({ email });

      if (admin) {
        admin.resetToken = token;
        // token expires after an hour
        admin.expireToken = Date.now() + 3600000;
        await admin.save();

        /*Sending mail using nodemailer */
        const nodemailer = require('nodemailer');

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          // let testAccount = await nodemailer.createTestAccount();

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: username, // generated ethereal user
              pass: password, // generated ethereal password
            },
          });

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Construction Tracker" <mvthanoshan9@gmail.com>', // sender address
            to: admin.email, // list of receivers
            subject: 'Reset Password: Construction Tracker', // Subject line
            text: 'Hello world?', // plain text body
            html: `
    <p> You have requested for password reset</p>
    <br>
    <h3>Click in this 
    <a href="http://localhost:3000/reset/${token}">to reset password</a>
    `,
            // html body
          });

          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
        main().catch(console.error);
        return res.json({ message: 'Check your email' });
      }

      let user = await User.findOne({ email });
      if (user) {
        user.resetToken = token;
        // token expires after an hour
        user.expireToken = Date.now() + 3600000;
        await user.save();

        /*Sending mail using nodemailer */
        const nodemailer = require('nodemailer');

        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          // let testAccount = await nodemailer.createTestAccount();

          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: username, // generated ethereal user
              pass: password, // generated ethereal password
            },
          });

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Construction Tracker" <mvthanoshan9@gmail.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Reset Password: Construction Tracker', // Subject line
            text: 'Hello world?', // plain text body
            html: `
    <p> You have requested for password reset</p>
    <br>
    <h3>Click in this 
    <a href="http://localhost:3000/reset/${token}">to reset password</a>
    `,
            // html body
          });

          console.log('Message sent: %s', info.messageId);
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
        main().catch(console.error);
        return res.json({ message: 'Check your email' });
      }

      return res.status(422).json({ error: 'User does not exist' });
    });
  }
);

// @route         POST api/new-password
// @description   new password
// @access        Public

router.post('/new-password', async (req, res) => {
  const { password, token } = req.body;

  const newPassword = password;
  const sentToken = token;

  let admin = await Admin.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  });

  if (admin) {
    //Encrypt password
    const salt = await bcrypt.genSalt(10); //10 is enough as per documentation
    admin.password = await bcrypt.hash(newPassword, salt);
    admin.resetToken = undefined;
    admin.expireToken = undefined;
    //save admin instance to database
    await admin.save();
    return res.json({ message: 'Password has been successfully updated!' });
  }

  let user = await User.findOne({
    resetToken: sentToken,
    expireToken: { $gt: Date.now() },
  });

  if (user) {
    //Encrypt password
    const salt = await bcrypt.genSalt(10); //10 is enough as per documentation
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.expireToken = undefined;
    //save user instance to database
    await user.save();
    return res.json({ message: 'Password has been successfully updated!' });
  }

  return res.status(500).json({ error: 'Server Error' });
});

//export the route
module.exports = router;
