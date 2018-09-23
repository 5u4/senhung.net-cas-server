/**
 * Transform user to a proper response user object
 *
 * @param user {User}
 *
 * @returns {{id: {String}, username: {String}}}
 */
const make = (user) => {
    return {
        id: user._id,
        username: user.username,
        email: user.email,
    };
};

/**
 * Transform a collection of users to a proper response user array
 *
 * @param users {Array}
 *
 * @returns {Array}
 */
const collection = (users) => {
    const transformed = [];

    users.forEach(user => {
        transformed.push(make(user));
    });

    return transformed;
};

module.exports = {
    make,
    collection,
};
