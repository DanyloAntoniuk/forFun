import express from 'express';
import ContentTypeController from '../../controllers/ContentTypeController';

const router = express.Router();

router.post('/content-types', ContentTypeController.contentTypeCreate);

router.get('/content-types/:title', ContentTypeController.contentTypeGetOne);

router.get('/content-types', ContentTypeController.contentTypesList);

router.put('/content-types/:title', ContentTypeController.contentTypeUpdate);

export default router;
