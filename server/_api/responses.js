/**
 * A collection of HTTP server responses that we'll be using
 */

/**
 * Success codes - 2xx
 */
const SUCCESS = 200;
const CREATED = 201;

/**
 * Client errors - 4xx
 */
const BAD_REQUEST = 400;
const FORBIDDEN = 403;
const NOT_FOUND = 404;

/**
 * Server errors - 5xx
 */
const SERVER_ERROR = 500;

module.exports = {
  SUCCESS, CREATED, BAD_REQUEST, FORBIDDEN, NOT_FOUND, SERVER_ERROR
};
