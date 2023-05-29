// Externals import
const express = require('express');

// internal imports
const { getUsers } = require('../../controller/usersController');

const router = express.Router();


// user page
router.get('/', getUsers);



// module exports
module.exports = router;