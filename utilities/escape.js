const escape = function (str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

// module exports
module.exports = escape;