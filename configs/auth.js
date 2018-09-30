const env = process.env;

module.exports = {
    saltRounds: 10,
    verifications: {
        emailVerificationCodeLength: 120,
    },
    cookie: {
        key: env.COOKIE_KEY,
        domain: env.COOKIE_DOMAIN,
    }
};
