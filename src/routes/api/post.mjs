import express from 'express';
import passport from 'passport';
import postController from '../../controllers/PostController';
import Auth from '../../services/AuthService';
// import { validateBody, schema } from '../helpers/schemaValidator';

const postRouter = express.Router();

const AuthService = new Auth(passport);

postRouter.get('/articles', postController.postList);

postRouter.get('/article/:id', postController.postGetOne);

postRouter.post('/articles', postController.postCreate);

postRouter.put('/article/:id', postController.postUpdate);

postRouter.delete('/article/:id', postController.postDelete);

export default postRouter;
