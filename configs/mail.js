const env = process.env;

module.exports = {
    gmail: {
        from: env.SMTP_FROM,
        user: env.SMTP_USER,
        password: env.SMTP_PASSWORD,
    },

    test: {
        from: env.SMTP_FROM,
        host: env.SMTP_TEST_HOST,
        port: env.SMTP_TEST_PORT,
        user: env.SMTP_TEST_USER,
        password: env.SMTP_TEST_PASSWORD,
    },
};
