/**
 * Getting jsonwebtoken for authentication
 */

const express = require('express');
//use express router
const router = express.Router();

//create route

// @route         GET api/employee/auth
// @description   Test route
// @access        Public

//if the access in public you dont need jsonwebtokens (dont require authorizations)
router.get('/', (req, res) => res.send('employee Auth route'));

//export the route
module.exports = router;
