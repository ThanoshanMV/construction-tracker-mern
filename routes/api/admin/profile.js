/**
 * Have routes for anything to deal with profiles,
 * fetching them, adding them, updating them
 */
const express = require('express');
//use express router
const router = express.Router();

//create route

// @route         GET api/admin/profile
// @description   Test route
// @access        Public

//if the access in public you dont need jsonwebtokens (dont require authorizations)
router.get('/', (req, res) => res.send('Admin Profile route'));

//export the route
module.exports = router;
