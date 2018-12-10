import express from 'express';
import ImageController from '../../../controllers/widgets/ImageController';
import { ensureDirectoryCreated, createUploadDirectory } from '../../../helpers/widgets';

const router = express.Router();

router.post('/images', ensureDirectoryCreated, createUploadDirectory, ImageController.uploadSingle('image'), ImageController.imageCreate);

router.get('/image/:id', ImageController.imageGetOne);

router.put('/image/:id', createUploadDirectory, ImageController.uploadSingle('image'), ImageController.imageUpdate);

router.delete('/image/:id', ImageController.imageDelete);

/**
 * TODO
 * router.post('/images/multiple',
 *  createUploadDirectory,
 *  ImageController.uploadMultiple('images'),
 *  ImageController.imageCreateMultiple);
 */

export default router;
