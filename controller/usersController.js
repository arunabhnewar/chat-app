// get user page
function getUsers(req, res, next) {
    res.render('pages/users')
};

// module exports
module.exports = { getUsers };