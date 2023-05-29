// get login page
function getLogin(req, res, next) {
    res.render("pages/index", {
        title: "Login - Chat Application",
    })
};


// module exports
module.exports = { getLogin };