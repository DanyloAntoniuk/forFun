import express from 'express';
import Video from './video';
import Image from './image';
import { createFileDirectory } from '../../../helpers/widgets';

const router = express.Router();

router.use('/widgets', createFileDirectory, Video, Image);

export default router;
