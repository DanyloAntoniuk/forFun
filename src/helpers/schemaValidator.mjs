import Joi from 'joi';

export function validateBody(schema) {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    const result = Joi.validate(req.body, schema);

    if (result.error) {
      return res.status(400).json(result.error);
    }

    req.value = req.value || {};

    // Set validated values for request object.
    req.value.body = result.value;
    next();
  };
}

export const schemas = {
  authSchema: Joi.object().keys({
    email: Joi.string()
      .email()
      .lowercase()
      .required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .regex(/^[a-zA-Z0-9]/)
      .required(),
    role: Joi.string()
      .lowercase()
      .valid('anonymous', 'authenticated', 'editor', 'admin')
      .required(),
  }),
  postSchema: {},
};
