// get inbox page
function getInbox(req, res, next) {
    res.render("pages/inbox", {
        title: "Inbox - Chat Application",
    })
};


// module exports
module.exports = { getInbox };