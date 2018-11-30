import express from 'express';
import passport from 'passport';
import { validateBody, schemas } from '../../helpers/schemaValidator';
import Auth from '../../services/AuthService';
import AuthController from '../../controllers/AuthController';

const AuthService = new Auth(passport);

const router = express.Router();

router.post('/register', validateBody(schemas.authSchema), AuthController.userRegister);

router.post('/login', [validateBody(schemas.authSchema), AuthService.authenticate('local')], AuthController.userLogin);

router.get('/login/google', AuthService.authenticate('google'), (req, res, next) => {
  console.log(312);
});

// router.get('/login/google/return', (req, res) => {
//   console.log(321);
// })

router.post('/login/github', AuthService.authenticate('github'), (req, res) => {
  console.log('bam bam');
});

export default router;
