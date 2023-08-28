import express from 'express';
import { InterscityController } from '../controllers/interscityController';

const router = express.Router();

router.post('/', InterscityController.create);
router.get('/', InterscityController.getAllFault);
router.get('/:uuid', InterscityController.getFaultByUUID);
router.delete('/:uuid', InterscityController.deleteFault);

export default router;
