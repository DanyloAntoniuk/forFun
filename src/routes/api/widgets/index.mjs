import express from 'express';
import Video from './video';
import Image from './image';

const router = express.Router();

router.use('/widgets', Video, Image);

export default router;
