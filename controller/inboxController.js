// external imports
const createError = require("http-errors");



// internal imports
const Conversation = require("../models/Conversation");



// get inbox page
async function getInbox(req, res, next) {
    try {
        const conversations = await Conversation.find({
            $or: [{ "creator.id": req.user.userid }, { "participant.id": req.user.userid }]
        });

        res.locals.data = conversations;
        res.render("pages/inbox");
    } catch (err) {
        next(err);
    }
};


// search user


// module exports
module.exports = { getInbox };