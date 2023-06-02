// external imports
const { check, validationResult } = require('express-validator');


// do login validators
const loginValidators = [
    // username
    check('username')
        .isLength({ min: 2 })
        .withMessage("Mobile number or email is required"),

    // password
    check('password')
        .isLength({ min: 2 })
        .withMessage("Password is required"),
];



// login validation handle
const loginValidationHandler = function (req, res, next) {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();

    if (Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        res.render("pages/index", {
            data: {
                username: req.body.username,
            },
            errors: mappedErrors,
        });
    };
};



// module export
module.exports = { loginValidators, loginValidationHandler };