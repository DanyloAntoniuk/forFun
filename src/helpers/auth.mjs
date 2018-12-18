/**
 * Module dependencies.
 */
import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config/auth';

/**
  * Create JSON Web Token and sign it to current user.
  * Token is valid for 2 hours.
  *
  * @param {Object} user User object.
  * @returns {String} Generated JW Token.
  */
export function signToken(user) {
  return JWT.sign({
    iss: 'megasecret',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setHours(new Date().getHours() + 2),
  }, config.JWT_SECRET);
}

/**
 * Generate hashed user password with 10 characters salt.
 *
 * @param {String} password User password.
 * @returns {String} Hashed password.
 */
export async function generatePassword(password) {
  const saltRounds = 10;

  return bcrypt.hash(password, saltRounds);
}
