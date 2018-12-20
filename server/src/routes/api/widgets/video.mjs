import express from 'express';
import VideoController from '../../../controllers/widgets/VideoController';
import { validateBody, schemas } from '../../../helpers/schemaValidator';
import AuthService from '../../../services/AuthService';
import AccessControlService from '../../../services/AccessControlService';

const router = express.Router();

router.get('/videos', VideoController.videoList);

router.post('/videos', AuthService.jwt(), AccessControlService.checkPermissions, validateBody(schemas.widgets.videoSchema), VideoController.videoCreate);

router.get('/video/:id', VideoController.videoGetOne);

router.put('/video/:id', AuthService.jwt(), AccessControlService.checkPermissions, validateBody(schemas.widgets.videoSchema), VideoController.videoUpdate);

router.delete('/video/:id', AuthService.jwt(), AccessControlService.checkPermissions, VideoController.videoDelete);

export default router;
