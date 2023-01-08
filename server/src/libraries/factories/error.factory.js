const { APIError } = require('../exceptions');
const { isNumber } = require('lodash');

/**
 * Error Factory class
 * @typedef ErrorFactory
 */
class ErrorFactory {

  /**
   * Return an error from the passed properties
   * @param {object} errorProperties passed error properties defined in mappings/errors
   * @returns {Error}
   */
  static getError(errorProperties) {
    /**
     * If no properties provided, return UNKOWN Error
     */
    if (!errorProperties) {
      return new APIError
    }

    /**
     * Create Error from Properties
     */
    return new APIError(
      errorProperties.message,
      errorProperties.key,
      errorProperties.statusCode,
      errorProperties.meta,
    );
  }
}

/**
 * Export class
 * @typedef ErrorFactory
 */
module.exports = ErrorFactory;