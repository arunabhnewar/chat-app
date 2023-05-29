// Externals import
const express = require('express');

// internal imports
const { getUsers } = require('../../controller/usersController');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const avatarUpload = require('../../middlewares/users/avatarUpload');

const router = express.Router();


// user page
router.get('/', htmlResponse("Users"), getUsers);

// add new user
router.post('/', avatarUpload)



// module exports
module.exports = router;