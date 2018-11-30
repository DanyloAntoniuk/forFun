import JWT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../../config/auth';

export function signToken(user) {
  return JWT.sign({
    iss: 'miniDrupal',
    sub: user.id,
    iat: new Date().getTime(), // current time
    exp: new Date().setHours(new Date().getHours() + 2), // current time + 2 hours ahead
  }, config.JWT_SECRET);
}

export async function generatePassword(password) {
  const saltRounds = 10;

  return bcrypt.hash(password, saltRounds);
}
