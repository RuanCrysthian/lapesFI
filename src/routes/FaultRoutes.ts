import express from 'express';
import { FaultController } from '../controllers/faultController';

const router = express.Router();

router.post('/', FaultController.create);
router.get('/', FaultController.getAllFault);
router.get('/:uuid', FaultController.getFaultByUUID);
router.delete('/:uuid', FaultController.deleteFault);

export default router;
