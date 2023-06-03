// external imports
const createError = require("http-errors");


// internal imports
const Conversation = require("../models/Conversation");
const User = require("../models/People");
const escape = require("../utilities/escape");



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
    const email_search_regex = new RegExp("^" + escape(searchQuery) + "$" + "i");


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





// module exports
module.exports = { getInbox, searchUser };