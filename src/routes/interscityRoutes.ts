import express from 'express';
import { InterscityController } from '../controllers/interscityController';

const router = express.Router();

router.post('/', InterscityController.create);
router.get('/', InterscityController.getAllFault);

export default router;
