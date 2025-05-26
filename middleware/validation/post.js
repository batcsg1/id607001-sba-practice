import Joi from 'joi';

const validatePostPost = (req, res, next) => {
  // Write your schema solution here
  const postSchema = Joi.object({
    title: Joi.string().min(3).max(100).required().messages({
      "string.base": "title should be a string",
      "string.empty": "title cannot be empty",
      "string.min": "title must be at least {#limit} characters long",
      "string.max": "title must be at lesser than {#limit} characters long",
      "any.required": "title is required"
    }),
    content: Joi.string().min(3).max(100).required().messages({
      "string.base": "firstName should be a string",
      "string.empty": "firstName cannot be empty",
      "string.min": "firstName should have a minimum length of {#limit}",
      "string.max": "firstName should have a maximum length of {#limit}"
    }),
    published: Joi.boolean().required().messages({
      "boolean.base": "published should be a boolean",
      "any.required": "published is required"
    }),
    authorId: Joi.number().min(0).max(100).required().messages({
      "number.base": "authorId should be a number",
      "number.min": "authorId should be greater than or equal to {#limit}",
      "number.max": "authorId should be lesser than or equal to {#limit}",
      "any.required": "authorId is required"
    }),
  });

  const { error } = postSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

const validatePutPost = (req, res, next) => {
  // No schema solution required
  const putSchema = Joi.object({});

  const { error } = putSchema.validate(req.body);

  if (error) {
    return res.status(409).json({ message: error.details[0].message });
  }

  next();
};

export { validatePostPost, validatePutPost };
