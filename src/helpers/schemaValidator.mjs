/**
 * Module dependencies.
 */
import Joi from 'joi';

/**
 * Validation for incoming requests JSON.
 *
 * @param {Object} schema
 * @return {Function}
 */
export function validateBody(schema) {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    console.log(req);
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

/**
 * Field types to validate.
 *
 * @see https://github.com/hapijs/joi/blob/v14.3.0/API.md
 */
const email = Joi.string()
  .email()
  .lowercase()
  .required();

const password = Joi.string()
  .min(6)
  .max(20)
  .regex(/^[a-zA-Z0-9]/)
  .required();

const role = Joi.string()
  .lowercase()
  .valid('anonymous', 'authenticated', 'editor', 'admin')
  .required();

const active = Joi.bool()
  .required();

const textField = Joi.string()
  .required();

const status = Joi.string()
  .valid('Unpublished', 'Published', 'Archive')
  .required();

const objectID = Joi.string()
  .regex(/^[a-fA-F0-9]{24}$/);

const array = Joi.array();

const number = Joi.number()
  .required();

/**
 * Available schemas.
 */
export const schemas = {
  registerSchema: Joi.object().keys({
    active,
    email,
    password,
    role,
  }),
  loginSchema: Joi.object().keys({ email, password }),
  // userSchema: Joi.object().keys({ email,  }),
  widgets: {
    mediaSchema: Joi.object().keys({
      title: textField,
      image: {
        originalName: textField,
        size: number,
        mimetype: textField,
        path: textField,
      },
    }),
  },
  postSchema: Joi.object().keys({
    title: textField,
    status,
    author: objectID,
    widgets: array,
  }),
};
