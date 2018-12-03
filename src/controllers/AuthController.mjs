import bcrypt from 'bcrypt';
import User from '../models/User';
import { signToken, generatePassword } from '../helpers/auth';

export default {
  async userRegister(req, res, next) {
    try {
      const { email, password, role } = req.value.body;
      const foundedUser = await User.findOne({ 'local.email': email });

      if (foundedUser) {
        res.status(422).json({ message: `Email ${email} is already registered.` });
      }

      const hash = await generatePassword(password);

      const user = new User({
        method: 'local',
        local: {
          email,
          password: hash,
        },
        role,
      });
      await user.save();

      const token = signToken(user);

      res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  },

  async userLogin(req, res, next) {
    try {
      const { email, password } = req.value.body;

      const user = await User.findOne({ 'local.email': email });

      if (user) {
        const match = await bcrypt.compare(password, user.local.password);

        if (!match) {
          res.status(400).json({ message: 'Password is incorrect.' });
        }

        const token = signToken(user);

        res.status(200).json({ user, token });
      } else {
        res.status(404).json({ message: `User ${email} is not registered.` });
      }
    } catch (err) {
      next(err);
    }
  },

  async googleOauthCallback(req, res, next) {
    try {
      const { email } = req.user.google;

      const user = await User.findOne({ 'google.email': email });

      const token = signToken(user);

      // TODO change response header to application/json
      res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  },

  async githubOauthCallback(req, res, next) {
    try {
      const { email } = req.user.github;

      const user = await User.findOne({ 'github.email': email });

      const token = signToken(user);

      // TODO change response header to application/json
      res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  },

  userRoleAuth(roles) {
    return async (req, res, next) => {
      try {
        const { user } = req;

        const foundedUser = await User.findById(user._id);

        if (!foundedUser) {
          res.status(404).json({ message: 'No User found' });
        }

        if (roles.indexOf(foundedUser.role) > -1) {
          return next();
        }

        res.status(401).json({ message: 'Unauthorized' });
      } catch (err) {
        next(err);
      }
    };
  },
};
