// external imports
const createError = require("http-errors");


// internal imports
const Conversation = require("../models/Conversation");
const User = require("../models/People");
const escape = require("../utilities/escape");
const Message = require("../models/Message");



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
async function searchUser(req, res, next) {
    const user = req.body.user;
    const searchQuery = user.replace("+88", "");


    const name_search_regex = new RegExp(escape(searchQuery), "i");
    const mobile_search_regex = new RegExp("^" + escape("+88" + searchQuery));
    const email_search_regex = new RegExp("^" + escape(searchQuery) + "$", "i");


    try {
        if (searchQuery !== "") {
            const users = await User.find({
                $or: [
                    { name: name_search_regex },
                    { mobile: mobile_search_regex },
                    { email: email_search_regex }
                ]
            },
                "name avatar"
            );
            res.json(users);

        } else {
            throw createError("You must provide some text to search!");
        }


    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                }
            }
        });
    }
};



// add conversation
async function addConversation(req, res, next) {
    try {
        const newConversation = new Conversation({
            creator: {
                id: req.user.userid,
                name: req.user.username,
                avatar: req.user.avatar || null,
            },
            participant: {
                id: req.body.id,
                name: req.body.participant,
                avatar: req.body.avatar || null,
            },
        });

        const result = await newConversation.save();
        res.status(200).json({
            message: "Conversation was added successfully!",
        });

    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
};



// get messages of a conversation
async function getMessages(req, res, next) {
    try {
        const messages = await Message.find({
            conversation_id: req.params.conversation_id,
        }).sort("-createdAt");

        const { participant } = await Conversation.findById(req.params.conversation_id);

        res.status(200).json({
            data: {
                messages: messages,
                participant,
            },

            user: req.user.userid,
            conversation_id: req.params.conversation_id,
        });

    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occurred!",
                },
            },
        });
    }
};



// send new message
async function sendMessage(req, res, next) {
    if (req.body.message || (req.files && req.files.length > 0)) {

        try {
            // save message text/attachment in database

        } catch (err) {

        }
    }
};


// module exports
module.exports = { getInbox, searchUser, addConversation, getMessages, sendMessage };