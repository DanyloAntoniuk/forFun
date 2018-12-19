import express from 'express';
import FileController from '../../../controllers/widgets/FileController';
import { ensureDirectoryCreated, createUploadDirectory, uploadSingle } from '../../../helpers/widgets';
import { validateBody, schemas } from '../../../helpers/schemaValidator';
import AuthService from '../../../services/AuthService';
import AccessControlService from '../../../services/AccessControlService';

const router = express.Router();

router.get('/files', FileController.fileList);

router.post('/files', AuthService.jwt(), AccessControlService.checkPermissions, ensureDirectoryCreated, createUploadDirectory, uploadSingle.call(FileController, 'file'), validateBody(schemas.widgets.uploadSchema), FileController.fileCreate);

router.get('/file/:id', FileController.fileGetOne);

router.put('/file/:id', AuthService.jwt(), AccessControlService.checkPermissions, createUploadDirectory, uploadSingle.call(FileController, 'file'), validateBody(schemas.widgets.uploadSchema), FileController.fileUpdate);

router.delete('/file/:id', AuthService.jwt(), AccessControlService.checkPermissions, FileController.fileDelete);

/**
 * @TODO
 * router.post('/files/multiple',
 *  createUploadDirectory,
 *  FileController.uploadMultiple('files'),
 *  FileController.fileCreateMultiple);
 */

export default router;
