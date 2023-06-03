// Externals import
const express = require('express');

// internal imports
const { getInbox, searchUser, addConversation } = require('../../controller/inboxController')
const htmlResponse = require('../../middlewares/common/htmlResponse');
const { checkLogin } = require('../../middlewares/common/checkLogin');


const router = express.Router();


// login page
router.get('/', htmlResponse("Inbox"), checkLogin, getInbox);


// search user for conversation
router.post('/search', checkLogin, searchUser);


// add conversation
router.post('/addConversation', checkLogin, addConversation);

// module exports
module.exports = router;