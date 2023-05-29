// Externals import
const express = require('express');

// internal imports
const { getInbox } = require('../../controller/inboxController')
const htmlResponse = require('../../middlewares/common/htmlResponse');


const router = express.Router();


// login page
router.get('/', htmlResponse("Inbox"), getInbox);



// module exports
module.exports = router;