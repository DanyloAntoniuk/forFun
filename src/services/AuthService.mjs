import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth';
import passportGithub from 'passport-github';
import config from '../../config/auth';
import User from '../models/User';

const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;
const GithubStrategy = passportGithub.Strategy;

class AuthService {
  constructor(pass) {
    this.passport = pass;

    this.google = this.google;
    this.local = this.local;
    this.jwt = this.jwt;
    this.github = this.github;
  }

  static get allowedStrategies() {
    return [
      'jwt',
      'local',
      'github',
      'google',
    ];
  }

  authenticate(strategy) {
    if (AuthService.allowedStrategies.indexOf(strategy) === -1) {
      throw new Error(`Only ${AuthService.allowedStrategies.toString()} strategies are available`);
    }
    // this.init(strategy);

    this[strategy]();

    return this.passport.authenticate(strategy, { session: false, scope: ['profile', 'email'] });
  }

  jwt() {
    const { ExtractJwt } = passportJwt;

    // eslint-disable-next-line consistent-return
    this.passport.use(new JwtStrategy({
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.sub);

        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }));
  }

  local() {
    // eslint-disable-next-line consistent-return
    this.passport.use(new LocalStrategy({
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ 'local.email': email });

        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }));
  }

  google() {
    this.passport.use(new GoogleStrategy({
      clientID: config.oauth.google.clientID,
      clientSecret: config.oauth.google.clientSecret,
      // TODO use real gost name.
      callbackURL: 'http://localhost:3000/api/login/google/oauthCallback',
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
          },
          role: 'authenticated',
        });

        await user.save();
        done(null, user);
      } catch (err) {
        done(err, false, err.message);
      }
    }));
  }

  github() {
    this.passport.use(new GithubStrategy({
      clientID: config.oauth.github.clientID,
      clientSecret: config.oauth.github.clientSecret,
      callbackURL: 'http://localhost:3000/api/login/github/oauthCallback',
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
  }
}

export default AuthService;
