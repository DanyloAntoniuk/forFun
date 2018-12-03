import express from 'express';
import passport from 'passport';
import UserController from '../../controllers/UserController';
import Auth from '../../services/AuthService';
import AuthController from '../../controllers/AuthController';

const AuthService = new Auth(passport);

const router = express.Router();

router.get('/user/:id([0-9a-f]{24})', AuthService.authenticate('jwt'), UserController.userGetOne);

router.get('/users', [AuthService.authenticate('jwt'), AuthController.userRoleAuth('admin')], UserController.userList);

router.put('/user/:id', [AuthService.authenticate('jwt'), AuthController.userRoleAuth(['authenticated', 'admin'])], UserController.userUpdate);

export default router;
