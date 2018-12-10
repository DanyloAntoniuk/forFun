import express from 'express';
import PostController from '../../controllers/PostController';
// import AuthService from '../../services/AuthService';
import { validateBody, schemas } from '../../helpers/schemaValidator';

const postRouter = express.Router();

postRouter.get('/articles', PostController.postList);

postRouter.get('/article/:id', PostController.postGetOne);

postRouter.post('/articles', validateBody(schemas.postSchema), PostController.postCreate);

postRouter.put('/article/:id', validateBody(schemas.postSchema), PostController.postUpdate);

postRouter.delete('/article/:id', PostController.postDelete);

export default postRouter;
