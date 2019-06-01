import express from 'express';
import UserController from '../../controllers/UserController';
import AuthService from '../../services/AuthService';
import { validateBody, schemas } from '../../helpers/schemaValidator';
import AccessControlService from '../../services/AccessControlService';

const router = express.Router();

router.get('/user/:id([0-9a-f]{24})', UserController.userGetOne);

router.get('/users', UserController.userList);

router.post('/user/:id/cancel', validateBody(schemas.userCancelSchema), UserController.userCancel);

router.delete('/user/:id', UserController.userDelete);

router.put('/user/:id', UserController.userUpdate);

export default router;
