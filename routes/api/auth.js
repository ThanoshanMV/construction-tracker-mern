/**
 * For email purpose
 */
const express = require('express');
//use express router
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');

// Models
const Admin = require('../../models/admin/User');
const User = require('../../models/employee/User');

const crypto = require('crypto');

// @route         POST api/reset-password
// @description   reset password
// @access        Public

router.post('/reset-password', async (req, res) => {
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

      var nodemailer = require('nodemailer');
      var sgTransport = require('nodemailer-sendgrid-transport');

      var options = {
        auth: {
          api_key:
            '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',
        },
      };

      var mailer = nodemailer.createTransport(sgTransport(options));

      var mail = {
        to: admin.email,
        from: 'mvthanoshan9@gmail.com',
        subject: 'Reset Password',
        text: 'Reset Password',
        html: `
        <p> You have requested for passwrd reset</p>
        <br>
        <h3>Click in this 
        <a href="http://localhost:3000/reset/${token}">to reset password</a>
        `,
      };

      mailer.sendMail(mail, function (err, res) {
        if (err) {
          console.log(err);
        }
        console.log(res);
      });
      return res.json({ message: 'Check your email' });
    }

    let user = await User.findOne({ email });
    if (user) {
      user.resetToken = token;
      // token expires after an hour
      user.expireToken = Date.now() + 3600000;
      await user.save();

      var nodemailer = require('nodemailer');
      var sgTransport = require('nodemailer-sendgrid-transport');

      var options = {
        auth: {
          api_key:
            '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',
        },
      };

      var mailer = nodemailer.createTransport(sgTransport(options));

      var mail = {
        to: user.email,
        from: 'mvthanoshan9@gmail.com',
        subject: 'Reset Password',
        text: 'Reset Password',
        html: `
          <p> You have requested for passwrd reset</p>
          <br>
          <h3>Click in this 
          <a href="http://localhost:3000/reset/${token}">to reset password</a>
          `,
      };

      mailer.sendMail(mail, function (err, res) {
        if (err) {
          console.log(err);
        }
        console.log(res);
      });
      return res.json({ message: 'Check your email' });
    }

    return res.status(422).json({ error: 'User does not exist' });
  });
});

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
