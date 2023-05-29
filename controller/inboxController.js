// get inbox page
function getInbox(req, res, next) {
    res.render("pages/inbox");
};


// module exports
module.exports = { getInbox };