// Externals import
const express = require('express');

// internal imports
const { getLogin, login, logout } = require('../../controller/loginController');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const { loginValidators, loginValidationHandler } = require('../../middlewares/login/loginValidators');
const { redirectLoggedIn } = require('../../middlewares/common/checkLogin');

const router = express.Router();


// set page title
const page_title = "Login";


// login page
router.get('/', htmlResponse(page_title), redirectLoggedIn, getLogin);

// process login
router.post("/", htmlResponse(page_title), loginValidators, loginValidationHandler, login);

// logout
router.delete('/', logout);


// module exports
module.exports = router;