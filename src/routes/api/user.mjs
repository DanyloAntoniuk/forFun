import express from 'express';
import UserController from '../../controllers/UserController';
import AuthService from '../../services/AuthService';
import { validateBody, schemas } from '../../helpers/schemaValidator';
import AuthController from '../../controllers/AuthController';
import AccessControlService from '../../services/AccessControlService';

const router = express.Router();

router.get('/user/:id([0-9a-f]{24})', AuthService.jwt(), AccessControlService.checkPermissions, UserController.userGetOne);

router.get('/users', AuthService.jwt(), UserController.userList);

router.post('/user/:id/cancel', AuthService.jwt(), validateBody(schemas.userCancelSchema), AuthService.jwt(), UserController.userCancel);

router.delete('/user/:id', AuthService.jwt(), UserController.userDelete);

router.put('/user/:id', AuthService.jwt(), UserController.userUpdate);

export default router;
