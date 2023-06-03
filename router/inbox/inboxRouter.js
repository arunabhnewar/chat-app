// Externals import
const express = require('express');

// internal imports
const { getInbox, searchUser } = require('../../controller/inboxController')
const htmlResponse = require('../../middlewares/common/htmlResponse');
const { checkLogin } = require('../../middlewares/common/checkLogin');


const router = express.Router();


// login page
router.get('/', htmlResponse("Inbox"), checkLogin, getInbox);


// search user for conversation
router.post('/search', checkLogin, searchUser);



// module exports
module.exports = router;