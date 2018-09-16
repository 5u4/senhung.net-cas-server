const env = process.env;

module.exports = {
    port: env.PORT || env.APP_PORT || 3000,
};
