// external imports
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const unlink = require('fs');
const path = require('path');

// internal imports
const User = require('../../models/People');


// add user
const addUserValidators = [
    // name
    check('name')
        .isLength({ min: 2 })
        .withMessage("Name is required")
        .isAlpha("en-US", { ignore: " -" })
        .withMessage("Name must not contain anything other than alphabet")
        .trim(),

    // email
    check('email')
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address")
        .toLowerCase()
        .trim()
        .custom(async (value) => {

            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError("Email already exists")
                }
            } catch (error) {
                throw createError(err.message);
            }
        }),

    // mobile
    check('mobile')
        .notEmpty()
        .withMessage("Mobile is required")
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage("Mobile number must be a valid Bangladeshi mobile number")
        .custom(async (value) => {

            try {
                const user = await User.findOne({ mobile: value });

                if (user) {
                    throw createError("Mobile number already exists")
                }
            } catch (error) {
                throw createError(err.message);
            }
        }),

    // password
    check('password')
        .notEmpty()
        .withMessage("Password is required")
        .isStrongPassword()
        .withMessage("Password must be at least 8 characters long & should contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol")
];



// user validation handle
const userValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        // remove uploaded files
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(path.join(__dirname, `/../public/uploads/avatars/${filename}`), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }


        // response the errors
        res.status(500).json({
            errors: mappedErrors,
        });
    }
};


// module exports
module.exports = { addUserValidators, userValidationHandler };