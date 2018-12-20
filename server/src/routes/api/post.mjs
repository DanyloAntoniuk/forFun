import express from 'express';
import PostController from '../../controllers/PostController';
import { validateBody, schemas } from '../../helpers/schemaValidator';
import AuthService from '../../services/AuthService';
import AccessControlService from '../../services/AccessControlService';

const router = express.Router();

router.get('/posts', PostController.postList);

router.get('/post/:id', PostController.postGetOne);

router.post('/posts', AuthService.jwt(), AccessControlService.checkPermissions, validateBody(schemas.postSchema), PostController.postCreate);

router.put('/post/:id', AuthService.jwt(), AccessControlService.checkPermissions, validateBody(schemas.postSchema), PostController.postUpdate);

router.delete('/post/:id', AuthService.jwt(), AccessControlService.checkPermissions, PostController.postDelete);

export default router;