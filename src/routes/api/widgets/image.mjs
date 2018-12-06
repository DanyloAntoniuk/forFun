import express from 'express';
import ImageController from '../../../controllers/widgets/ImageController';
import { validateBody, schemas } from '../../../helpers/schemaValidator';

const router = express.Router();

router.post('/images', validateBody(schemas.widgets.mediaSchema), ImageController.imageCreate);

export default router;
