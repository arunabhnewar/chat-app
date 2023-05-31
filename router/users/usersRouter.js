// Externals import
const express = require('express');


// internal imports
const { getUsers, addUser, removeUser } = require('../../controller/usersController');
const htmlResponse = require('../../middlewares/common/htmlResponse');
const avatarUpload = require('../../middlewares/users/avatarUpload');
const { addUserValidators, userValidationHandler } = require('../../middlewares/users/userValidators');

const router = express.Router();


// user page
router.get("/", htmlResponse("Users"), getUsers);

// add new user
router.post("/", avatarUpload, addUserValidators, userValidationHandler, addUser)

// remove existing user
router.delete("/:id", removeUser)


// module exports
module.exports = router;