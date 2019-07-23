import express from 'express';
import ImageController from '../../../controllers/widgets/ImageController';
import { ensureDirectoryCreated, createUploadDirectory, uploadSingle } from '../../../helpers/widgets';
import { validateBody, schemas } from '../../../helpers/schemaValidator';
import AccessControlService from '../../../services/AccessControlService';
import AuthService from '../../../services/AuthService';

const router = express.Router();

router.get('/images', ImageController.imageList);

router.post('/images', ensureDirectoryCreated, createUploadDirectory, uploadSingle.call(ImageController, 'image'), ImageController.imageCreate);
// router.post('/images', AuthService.jwt(), AccessControlService.checkPermissions, ensureDirectoryCreated, createUploadDirectory, uploadSingle.call(ImageController, 'image'), validateBody(schemas.widgets.uploadSchema), ImageController.imageCreate);

router.get('/images/:id', AccessControlService.checkPermissions, ImageController.imageGetOne);

router.put('/images/:id', createUploadDirectory, uploadSingle.call(ImageController, 'image'), ImageController.imageUpdate);
// router.put('/image/:id', AuthService.jwt(), AccessControlService.checkPermissions, createUploadDirectory, uploadSingle.call(ImageController, 'image'), validateBody(schemas.widgets.uploadSchema), ImageController.imageUpdate);

router.delete('/images/:id', AuthService.jwt(), AccessControlService.checkPermissions, ImageController.imageDelete);

/**
 * @TODO
 * router.post('/images/multiple',
 *  createUploadDirectory,
 *  ImageController.uploadMultiple('images'),
 *  ImageController.imageCreateMultiple);
 */

export default router;
