import express from 'express';
import ImageController from '../../../controllers/widgets/ImageController';
import { ensureDirectoryCreated, createUploadDirectory, uploadSingle } from '../../../helpers/widgets';
import { validateBody, schemas } from '../../../helpers/schemaValidator';
import AccessControllService from '../../../services/AccessControlService';

const router = express.Router();

router.get('/images', ImageController.imageList);

router.post('/images', ensureDirectoryCreated, createUploadDirectory, uploadSingle.call(ImageController, 'image'), validateBody(schemas.widgets.uploadSchema), ImageController.imageCreate);

router.get('/image/:id', AccessControllService.checkPermissions, ImageController.imageGetOne);

router.put('/image/:id', createUploadDirectory, uploadSingle.call(ImageController, 'image'), validateBody(schemas.widgets.uploadSchema), ImageController.imageUpdate);

router.delete('/image/:id', ImageController.imageDelete);

/**
 * @TODO
 * router.post('/images/multiple',
 *  createUploadDirectory,
 *  ImageController.uploadMultiple('images'),
 *  ImageController.imageCreateMultiple);
 */

export default router;
