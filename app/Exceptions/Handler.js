const { HttpException } = require('@senhung/http-exceptions');

const Handler = (err, req, res, next) => {
    /* Handle http error exception */
    if (err instanceof HttpException) {
        return res.status(err.getStatusCode()).json(err.getMessage() ? {message: err.getMessage()} : {});
    }

    /* Handle validation errors */
    if (err instanceof Error && err.errors) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors.map(err => err.location + '.' + err.field + ': ' + err.messages),
        });
    }

    /* Handle general errors */
    res.sendStatus(500);
};

module.exports = Handler;
