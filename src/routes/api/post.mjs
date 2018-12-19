import express from 'express';
import PostController from '../../controllers/PostController';
import { validateBody, schemas } from '../../helpers/schemaValidator';
import AuthService from '../../services/AuthService';
import AccessControlService from '../../services/AccessControlService';

const router = express.Router();

router.get('/posts', AccessControlService.checkPermissions, PostController.postList);

router.get('/post/:id', AuthService.jwt(), AccessControlService.checkPermissions, PostController.postGetOne);

router.post('/posts', validateBody(schemas.postSchema), PostController.postCreate);

router.put('/post/:id', validateBody(schemas.postSchema), AuthService.jwt(), AccessControlService.checkPermissions, PostController.postUpdate);

router.delete('/post/:id', PostController.postDelete);

export default router;
