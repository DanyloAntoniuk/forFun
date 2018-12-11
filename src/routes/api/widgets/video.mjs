import express from 'express';
import VideoController from '../../../controllers/widgets/VideoController';
import { validateBody, schemas } from '../../../helpers/schemaValidator';

const router = express.Router();

router.get('/videos', VideoController.videoList);

router.post('/videos', validateBody(schemas.widgets.videoSchema), VideoController.videoCreate);

router.get('/video/:id', VideoController.videoGetOne);

router.put('/video/:id', validateBody(schemas.widgets.videoSchema), VideoController.videoUpdate);

router.delete('/video/:id', VideoController.videoDelete);

export default router;
