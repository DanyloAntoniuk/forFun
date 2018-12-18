import express from 'express';
import Video from './video';
import Image from './image';
import File from './file';

const router = express.Router();

router.use('/widgets', Video, Image, File);

export default router;
