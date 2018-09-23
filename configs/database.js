const env = process.env;

module.exports = {
    auth: {
        connection: env.MONGODB_URI || 'mongodb://localhost:27017/auth'
    },

    testing: {
        connection: env.MONGODB_TEST_URI || 'mongodb://localhost:27017/auth_test'
    },
};
