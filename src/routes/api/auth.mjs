import express from 'express';
import { validateBody, schemas } from '../../helpers/schemaValidator';
import AuthService from '../../services/AuthService';
import AuthController from '../../controllers/AuthController';

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), AuthController.userRegister);

router.post('/login', [validateBody(schemas.loginSchema), AuthService.local()], AuthController.userLogin);

router.get('/login/google', AuthService.google());

router.get('/login/google/oauthCallback', AuthService.google(), AuthController.googleOauthCallback);

router.get('/login/github', AuthService.github());

router.get('/login/github/oauthCallback', AuthService.github(), AuthController.githubOauthCallback);

export default router;
