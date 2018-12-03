import express from 'express';
import Post from './api/post';
import User from './api/user';
import Auth from './api/auth';

const router = express.Router();

router.use('/api', Auth, User, Post);

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({ message: 'Internal error' });
});

export default router;
