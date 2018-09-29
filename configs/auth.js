const env = process.env;

module.exports = {
    saltRounds: 10,
    verifications: {
        emailVerificationCodeLength: 120,
    },
    cookieKey: env.COOKIE_KEY,
};
