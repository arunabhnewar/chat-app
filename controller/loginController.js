// external imports
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const createError = require("http-errors");


// internal imports
const User = require('../models/People');



// get login page
function getLogin(req, res, next) {
    res.render("pages/index")
};


// do login
async function login(req, res, next) {
    try {
        // find a user who has this email/mobile number
        const user = await User.findOne({
            $or: [{ email: req.body.username }, { mobile: req.body.username }]
        });

        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);

            if (isValidPassword) {
                // prepare the user object to generate token
                const userObject = {
                    // username: user.username,
                    username: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: "user",
                };

                // generate token
                const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE,
                });

                // set cookie
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRE,
                    httpOnly: true,
                    signed: true,
                });

                // set logged in user local identifier
                res.locals.loggedInUser = userObject;

                res.render("pages/inbox")

            } else {
                throw createError("Login failed! Please try again.");
            }

        } else {
            throw createError("Login failed! Please try again.");
        }

    } catch (err) {
        res.render("pages/index", {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    };
};



// logout
function logout(req, res, next) {
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("logged out");
}


// module exports
module.exports = { getLogin, login, logout };