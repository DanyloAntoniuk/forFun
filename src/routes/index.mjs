import express from 'express';
import Post from './api/post';
import User from './api/user';
import Auth from './api/auth';

const router = express.Router();

router.use('/api', Auth, User);

export default router;
