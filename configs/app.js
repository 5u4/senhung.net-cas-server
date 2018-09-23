const env = process.env;

module.exports = {
    app_key: env.APP_KEY || null,
    port: env.PORT || env.APP_PORT || 3000,
};
