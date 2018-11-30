import express from 'express';
import passport from 'passport';
import userController from '../../controllers/UserController';
import { validateBody, schemas } from '../../helpers/schemaValidator';
import Auth from '../../services/AuthService';

const AuthService = new Auth(passport);

const router = express.Router();

router.get('/user/:id([0-9a-f]{24})', userController.userGetOne);

router.get('/user/test', [AuthService.authenticate('jwt'), userController.userRoleAuth(['editor'])], (res, req) => {
  console.log('bom bom');
});

export default router;
