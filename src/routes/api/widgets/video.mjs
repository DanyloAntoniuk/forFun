import express from 'express';
import VideoController from '../../../controllers/widgets/VideoController';
import AuthService from '../../../services/AuthService';

const router = express.Router();

router.post('/videos', VideoController.videoCreate);

export default router;
