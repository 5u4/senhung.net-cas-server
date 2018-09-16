class HttpException
{
    /**
     * @param {Number} statusCode The http response status code
     * @param {String} message    The message of the exception
     */
    constructor(statusCode, message = null) {
        this.statusCode = statusCode;
        this.message    = message;
    }

    /**
     * Generate response json object
     * 
     * @returns {Object} The json response
     */
    getResponse() {
        return this.message ? {message: this.message} : {};
    }
}

module.exports = HttpException;
