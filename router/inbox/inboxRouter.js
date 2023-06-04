// Externals import
const express = require('express');

// internal imports
const { getInbox, searchUser, addConversation, getMessages, sendMessage } = require('../../controller/inboxController')
const htmlResponse = require('../../middlewares/common/htmlResponse');
const { checkLogin } = require('../../middlewares/common/checkLogin');
const attachmentUpload = require('../../middlewares/inbox/attachmentUpload');


const router = express.Router();


// login page
router.get("/", htmlResponse("Inbox"), checkLogin, getInbox);


// search user for conversation
router.post("/search", checkLogin, searchUser);


// add conversation
router.post("/conversation", checkLogin, addConversation);


// get messages of a conversation
router.get("/messages/:conversation_id", checkLogin, getMessages)


// send message
router.post("/message", checkLogin, attachmentUpload, sendMessage);

// module exports
module.exports = router;