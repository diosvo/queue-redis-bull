const { validationResult } = require('express-validator');

/**
 * @param{Array<ValidationChain>} validations schema validations
 * @description sequential processing, stops running validations chain if the previous one fails.
 * it can be reused by many routes
 */
const validate = validations => async (req, res, next) => {
  const message = (errors) => res.status(422).json({ errors });

  if (Array.isArray(validations)) {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return message(errors.array());
  };

  return message('passed validations is not an array');
};

module.exports = validate;