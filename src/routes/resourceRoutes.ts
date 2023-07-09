import express from 'express';
import { ResourceController } from '../controllers/resourceController';

const router = express.Router();

router.post('/', ResourceController.createResource);
router.get('/', ResourceController.getAllResource);
router.get('/:uuid', ResourceController.getResourceByUUID);
router.delete('/:uuid', ResourceController.deleteResource);
router.post('/:uuid/data', ResourceController.saveSensorData);

export default router;
