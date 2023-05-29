// get user page
function getUsers(req, res, next) {
    res.render('pages/users', {
        title: "Users - Chat Application",
    })
};

// module exports
module.exports = { getUsers };