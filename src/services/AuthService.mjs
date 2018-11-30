import passportJwt from 'passport-jwt';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth';
import os from 'os';
import config from '../../config/auth';
import User from '../models/User';

const JwtStrategy = passportJwt.Strategy;
const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

const { ExtractJwt } = passportJwt;

class AuthService {
  constructor(pass) {
    this.passport = pass;
    this.opts = {};
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

    this.init(strategy);

    return this.passport.authenticate(strategy, { scope: ['profile'] });
  }

  jwtAuth() {
    this.opts = {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.JWT_SECRET,
    };

    // eslint-disable-next-line consistent-return
    this.passport.use(new JwtStrategy(this.opts, async (jwtPayload, done) => {
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

  localAuth() {
    this.opts = {
      usernameField: 'email',
    };

    // eslint-disable-next-line consistent-return
    this.passport.use(new LocalStrategy(this.opts, async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    }));
  }

  googleAuth() {
    console.log(os.hostname());
    this.opts = {
      clientID: config.oauth.google.clientID,
      clientSecret: config.oauth.google.clientSecret,
      callbackURL: 'http://localhost:3000/api/login/google',
    };

    this.passport.use(new GoogleStrategy(
      this.opts,
      async (req, accessToken, refreshToken, profile, done) => {
        console.log(profile);
      },
    ));
  }

  init(strategy) {
    // eslint-disable-next-line default-case
    switch (strategy) {
      case 'jwt':
        this.jwtAuth();
        break;
      case 'local':
        this.localAuth();
        break;
      case 'google':
        this.googleAuth();
        break;
    }
  }
}

export default AuthService;
