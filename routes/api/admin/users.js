/**
 * Handels adding users
 */

const express = require('express');
//use express router
const router = express.Router();

//create route

// @route         GET api/admin/users
// @description   Test route
// @access        Public

//if the access in public you dont need jsonwebtokens (dont require authorizations)
router.get('/', (req, res) => res.send('Admin User route'));

//export the route
module.exports = router;
