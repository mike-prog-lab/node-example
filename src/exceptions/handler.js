const logger = require('../helpers/logger').init();

/**
 * Function responsible for handling errors and sending
 * HTTP error messages to client.
 *
 * @param err
 * @param req
 * @param res
 */
module.exports.httpExceptionHandler = (err, req, res) => {
    logger.error(err);

    let httpStatus = 500;
    let errorBody = {
        message: 'Server error.'
    }

    if (err.name === 'ValidationError') {
        httpStatus = 400;
        errorBody = {
            message: 'Bad fields provided.'
        }
    //    TODO: Extract error messages from error object and place into
    //    TODO: errorBody variable.
    }

    res.status(httpStatus).json(errorBody);
};