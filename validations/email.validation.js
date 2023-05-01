const { checkSchema } = require("express-validator");

const schemaValidation = checkSchema({
  from: {
    trim: true,
    notEmpty: true,
    errorMessage: 'from cannot be empty'
  },
  to: {
    trim: true,
    notEmpty: true,
    errorMessage: 'to cannot be empty'
  },
  subject: {
    trim: true,
    notEmpty: true,
    errorMessage: 'subject cannot be empty'
  },
  text: {
    trim: true,
    notEmpty: true,
    errorMessage: 'text cannot be empty'
  },
  message: {
    trim: true,
    notEmpty: true,
    errorMessage: 'message cannot be empty'
  }
});

module.exports = schemaValidation;
