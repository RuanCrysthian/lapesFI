import express from 'express';
import { CapabilityController } from '../controllers/capabilityController';

const router = express.Router();
router.get('/:uuid/data', CapabilityController.getSensorByUUID);
export default router;
