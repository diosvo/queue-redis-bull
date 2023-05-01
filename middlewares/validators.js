const { validationResult } = require('express-validator');

/**
 * @param{Array<ValidationChain>} validations schema validations
 * @description sequential processing, stops running validations chain if the previous one fails.
 * it can be reused by many routes
 */
const validate = validations => async (request, response, next) => {
  const message = (errors) => response.status(422).json({ message: 'validation failed', errors });

  if (Array.isArray(validations)) {
    for (const validation of validations) {
      await validation.run(request);
    }

    const errors = validationResult(request);
    if (errors.isEmpty()) {
      return next();
    }

    return message(errors.array());
  };

  return message('passed validations is not an array');
};

module.exports = validate;