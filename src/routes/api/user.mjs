import express from 'express';
import UserController from '../../controllers/UserController';
import AuthService from '../../services/AuthService';
import AuthController from '../../controllers/AuthController';

const router = express.Router();

router.get('/user/:id([0-9a-f]{24})', AuthService.jwt(), UserController.userGetOne);

router.get('/users', [AuthService.jwt(), AuthController.userRoleAuth('admin')], UserController.userList);

router.put('/user/:id', [AuthService.jwt(), AuthController.userRoleAuth(['authenticated', 'admin'])], UserController.userUpdate);

export default router;
