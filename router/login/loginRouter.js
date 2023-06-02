// Externals import
const express = require('express');

// internal imports
const { getLogin, login } = require('../../controller/loginController');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const { loginValidators, loginValidationHandler } = require('../../middlewares/login/loginValidators');

const router = express.Router();


// set page title
const page_title = "Login";


// login page
router.get('/', htmlResponse(page_title), getLogin);

// process login
router.post("/", htmlResponse(page_title), loginValidators, loginValidationHandler, login);



// module exports
module.exports = router;