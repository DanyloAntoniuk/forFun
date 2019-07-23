import express from 'express';
import UserController from '../../controllers/UserController';
import AuthService from '../../services/AuthService';
import { validateBody, schemas } from '../../helpers/schemaValidator';
import AccessControlService from '../../services/AccessControlService';

const router = express.Router();

router.get('/user/:username', UserController.userGetOne);

router.get('/users', UserController.userList);

router.post('/user/:id/cancel', AuthService.jwt(), validateBody(schemas.userCancelSchema), UserController.userCancel);

router.delete('/user/:id', AuthService.jwt(), UserController.userDelete);

router.put('/user/:id', AuthService.jwt(), UserController.userUpdate);

export default router;
