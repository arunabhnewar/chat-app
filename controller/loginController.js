// get login page
function getLogin(req, res, next) {
    res.render("pages/index")
};


// module exports
module.exports = { getLogin };