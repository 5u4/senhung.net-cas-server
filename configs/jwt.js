const env = process.env;

module.exports = {
    jwtsecret: env.APP_KEY || null,
    expiresIn: 60 * 60 * 24,
};
