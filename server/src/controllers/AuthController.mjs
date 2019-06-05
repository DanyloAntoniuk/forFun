/**
 * Module dependencies.
 */
import bcrypt from 'bcrypt';
import AccessControl from '../helpers/accessControl';
import User from '../models/User';
import { signToken, generatePassword } from '../helpers/auth';

export default {
  /**
   * User registration.
   * Creates user with local strategy.
   */
  async userRegister(req, res, next) {
    try {
      const { email, password, role } = req.value.body;

      // Deny registration with dupplicate emails.
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

      return res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Login user with local strategy through email and pass.
   */
  async userLogin(req, res, next) {
    try {
      const { email, password } = req.value.body;

      const user = await User.findOne({ 'local.email': email });

      if (user) {
        // @TODO Move password check to Model methods.
        const match = await bcrypt.compare(password, user.local.password);

        if (!match) {
          return res.status(400).json({ message: 'Password is incorrect.' });
        }

        const token = signToken(user);

        return res.status(200).json({ user, token });
      }

      return res.status(404).json({ message: `User ${email} is not registered.` });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Login through google account.
   *
   * @see https://console.developers.google.com/apis
   */
  async googleOauthCallback(req, res, next) {
    try {
      const { email } = req.user.google;

      const user = await User.findOne({ 'google.email': email });

      const token = signToken(user);

      // @TODO change response header to application/json
      res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Login through github account.
   *
   * @see https://developer.github.com/v3
   */
  async githubOauthCallback(req, res, next) {
    try {
      const { email } = req.user.github;

      const user = await User.findOne({ 'github.email': email });

      const token = signToken(user);

      // @TODO change response header to application/json
      res.status(201).json({ user, token });
    } catch (err) {
      next(err);
    }
  },

  /**
   * Middleware for protecting routes based on User role.
   *
   * @TODO Use accesscontrol module
   * @see https://github.com/onury/accesscontrol
   *
   * @param {Array} roles Roles to access route.
   */
  userEnsureAccess(role, action, resource) {
    return async (req, res, next) => {
      try {
        const foundedUser = await User.findById(req.params.id);

        if (!foundedUser) {
          res.status(404).json({ message: 'No User found' });
        }

        // Unlimited power.
        if (role === 'admin') {
          return next();
        }

        if (req.user._id.toString() === req.params.id) {
          const permission = AccessControl.can(role)[action](resource);

          if (permission.granted) {
            return next();
          }
        }

        res.status(401).json({ message: 'Unauthorized' });
      } catch (err) {
        next(err);
      }
    };
  },
};
