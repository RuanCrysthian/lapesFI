import express from 'express';
import { ResourceController } from '../controllers/resourceController';

const router = express.Router();

router.post('/', ResourceController.createResource);
router.get('/', ResourceController.getAllResource);
router.get('/:uuid', ResourceController.getResourceByUUID);

export default router;
