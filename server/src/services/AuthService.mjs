/**
 * Module dependencies.
 */
import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth';
import passportGithub from 'passport-github';
import passport from 'passport';
import config from '../../config/auth';
import User from '../models/User';

// Available Strategies.
const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;
const GithubStrategy = passportGithub.Strategy;

/**
 * Service for user authentication.
 */
class AuthService {
  constructor() {
    // Inject passport service.
    this.passport = passport;
  }

  /**
   * Authentication with JWT.
   */
  jwt() {
    const { ExtractJwt } = passportJwt;

    this.passport.use(new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.userID);
        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }));

    return this.passport.authenticate('jwt', { session: false });
  }

  /**
   * Local authentication with email and password.
   */
  local() {
    this.passport.use(new LocalStrategy({
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ 'strategy.email': email });

        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }));

    return this.passport.authenticate('local', { session: false });
  }

  /**
   * Authentication with Google account.
   */
  google() {
    this.passport.use(new GoogleStrategy({
      clientID: config.oauth.google.clientID,
      clientSecret: config.oauth.google.clientSecret,
      // @TODO use real host name.
      callbackURL: 'http://localhost:3001/api/login/google/oauthCallback',
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const foundedUser = await User.findOne({ 'google.id': profile.id });

        if (foundedUser) {
          return done(null, foundedUser);
        }

        const user = new User({
          method: 'google',
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            name: {
              familyName: profile.name.familyName,
              givenName: profile.name.givenName,
            },
          },
          role: 'authenticated',
        });

        await user.save();
        done(null, user);
      } catch (err) {
        done(err, false, err.message);
      }
    }));

    // Scope property is required for Google api.
    return this.passport.authenticate('google', { session: false, scope: ['profile', 'email'] });
  }

  /**
   * Authentication with Github account.
   */
  github() {
    this.passport.use(new GithubStrategy({
      clientID: config.oauth.github.clientID,
      clientSecret: config.oauth.github.clientSecret,
      callbackURL: 'http://localhost:3001/api/login/github/oauthCallback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const foundedUser = await User.findOne({ 'github.id': profile.id });

        if (foundedUser) {
          return done(null, foundedUser);
        }

        const user = new User({
          method: 'github',
          github: {
            id: profile.id,
            email: profile.emails[0].value,
          },
          role: 'authenticated',
        });

        await user.save();
        done(null, user);
      } catch (err) {
        done(err, false, err.message);
      }
    }));

    // Scope property is required for Github api.
    return this.passport.authenticate('github', { session: false, scope: ['profile', 'email'] });
  }
}

export default new AuthService();
