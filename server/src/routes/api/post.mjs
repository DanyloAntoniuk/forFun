import express from 'express';
import PostController from '../../controllers/PostController';
import { validateBody, schemas } from '../../helpers/schemaValidator';
import AuthService from '../../services/AuthService';
import AccessControlService from '../../services/AccessControlService';

const router = express.Router();

router.get('/posts', PostController.postList);

router.get('/posts/:title', PostController.postGetOne);

router.post('/posts', validateBody(schemas.postSchema), PostController.postCreate);

router.put('/posts/:id', AuthService.jwt(), AccessControlService.checkPermissions, validateBody(schemas.postSchema), PostController.postUpdate);

// router.delete('/post/:id', AuthService.jwt(), AccessControlService.checkPermissions, PostController.postDelete);
router.delete('/posts/:id', PostController.postDelete);

router.delete('/posts', PostController.postDeleteMany);

export default router;
