import express from 'express';
import ImageController from '../../../controllers/widgets/ImageController';
import { createUploadDirectory } from '../../../helpers/widgets';
import { validateBody, schemas } from '../../../helpers/schemaValidator';

const router = express.Router();

router.post('/images', createUploadDirectory, ImageController.uploadSingle('image'), ImageController.imageCreate);

export default router;
