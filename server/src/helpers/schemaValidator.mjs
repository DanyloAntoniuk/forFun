/**
 * Module dependencies.
 */
import Joi from 'joi';

/**
 * Validation for incoming requests JSON.
 *
 * @param {Object} schema Joi schema to validate.
 * @returns {Function} Express middleware.
 */
export function validateBody(schema) {
  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    console.log(req.body);
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
  userCancelSchema: Joi.object().keys({ active }),
  postSchema: Joi.object().keys({
    _id: objectID.optional(),
    createdAt: Joi.string().optional(), // @TODO validate field
    updatedAt: Joi.string().optional(), // @TODO validate field
    __v: Joi.number().optional(),
    title: textField,
    status,
    author: objectID,
    widgets: array,
    fields: array,
  }),
  widgets: {
    uploadSchema: {
      title: textField,
    },
    videoSchema: {
      title: textField,
      video: {
        youtube: {
          videoID: Joi.string(),
        },
        vimeo: {
          videoID: Joi.string(),
        },
      },
    },
  },
};
