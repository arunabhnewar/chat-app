// Externals import
const express = require('express');

// internal imports
const { getUsers } = require('../../controller/usersController');
const htmlResponse = require('../../middlewares/common/htmlResponse');

const router = express.Router();


// user page
router.get('/', htmlResponse("Users"), getUsers);



// module exports
module.exports = router;