const env = process.env;

module.exports = {
    jwtsecret: env.JWT_SECRET || null,
    expiresIn: 60 * 60 * 24,
};
