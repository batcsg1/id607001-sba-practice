import Joi from 'joi';

const validatePostUser = (req, res, next) => {
  // Write your schema solution here
  const postSchema = Joi.object({
    firstName: Joi.string().min(3).max(100).required().messages({
      "string.base": "firstName should be a string",
      "string.empty": "firstName cannot be empty",
      "string.min": "firstName should have a minimum length of {#limit}",
      "string.max": "firstName should have a maximum length of {#limit}",
      "any.required": "firstName is required"
    }),
    lastName: Joi.string().min(3).max(100).required().messages({
      "string.base": "lastName should be a string",
      "string.empty": "lastName cannot be empty",
      "string.min": "lastName should have a minimum length of {#limit}",
      "string.max": "lastName should have a maximum length of {#limit}",
      "any.required": "lastName is required"
    }),
    email: Joi.string().pattern(new RegExp('^([a-z]+.[a-z]+)@outlook.com')).required().messages({
      "string.base": "email should be a string",
      "string.empty": "email cannot be empty",
      "any.required": "email is required",
      "string.pattern.base": "email must end with @outlook.com"
    }),
  });

  const { error } = postSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

const validatePutUser = (req, res, next) => {
  // Write your schema solution here
  const putSchema = Joi.object({
    firstName: Joi.string().min(3).max(100).optional().messages({
      "string.base": "firstName should be a string",
      "string.empty": "firstName cannot be empty",
      "string.min": "firstName should have a minimum length of {#limit}",
      "string.max": "firstName should have a maximum length of {#limit}",
    }),
    lastName: Joi.string().min(3).max(100).optional().messages({
      "string.base": "lastName should be a string",
      "string.empty": "lastName cannot be empty",
      "string.min": "lastName should have a minimum length of {#limit}",
      "string.max": "lastName should have a maximum length of {#limit}"
    }),
    email: Joi.string().pattern(new RegExp('^([a-z]+.[a-z]+)@outlook.com')).optional().messages({
      "string.base": "email should be a string",
      "string.empty": "email cannot be empty",
      "string.pattern.base": "email must end with @outlook.com"
    }),
  });

  const { error } = putSchema.validate(req.body);

  if (error) {
    return res.status(409).json({
      message: error.details[0].message,
    });
  }

  next();
};

export { validatePostUser, validatePutUser };
