// external imports
const bcrypt = require('bcrypt');



// internal imports
const User = require('../models/People');



// get user page
function getUsers(req, res, next) {
    res.render('pages/users')
};


// add user
const addUser = async (req, res, next) => {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashedPassword,
        });
    }

    // save user or send error
    try {
        const result = await newUser.save();

        res.status(200).json({
            message: "User was added successfully!",
        });

    } catch (error) {
        res.status(500).json({
            errors: {
                common: {
                    msg: "Unknown error occurred!!"
                }
            }
        });
    }
}



// module exports
module.exports = { getUsers, addUser };