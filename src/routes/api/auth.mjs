import express from 'express';
import passport from 'passport';
import { validateBody, schemas } from '../../helpers/schemaValidator';
import Auth from '../../services/AuthService';
import AuthController from '../../controllers/AuthController';

const AuthService = new Auth(passport);

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), AuthController.userRegister);

router.post('/login', [validateBody(schemas.loginSchema), AuthService.authenticate('local')], AuthController.userLogin);

router.get('/login/google', AuthService.authenticate('google'));

router.get('/login/google/oauthCallback', AuthService.authenticate('google'), AuthController.googleOauthCallback);

router.get('/login/github', AuthService.authenticate('github'));

router.get('/login/github/oauthCallback', AuthService.authenticate('github'), AuthController.githubOauthCallback);

export default router;
