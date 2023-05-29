// Externals import
const express = require('express');

// internal imports
const { getLogin } = require('../../controller/loginController');
const htmlResponse = require('../../middlewares/common/htmlResponse');

const router = express.Router();


// login page
router.get('/', htmlResponse("Login"), getLogin);



// module exports
module.exports = router;