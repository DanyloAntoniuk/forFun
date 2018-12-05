import express from 'express';
import PostController from '../../controllers/PostController';
import AuthService from '../../services/AuthService';
// import { validateBody, schema } from '../helpers/schemaValidator';

const postRouter = express.Router();

postRouter.get('/articles', PostController.postList);

postRouter.get('/article/:id', PostController.postGetOne);

postRouter.post('/articles', PostController.postCreate);

postRouter.put('/article/:id', PostController.postUpdate);

postRouter.delete('/article/:id', PostController.postDelete);

export default postRouter;
