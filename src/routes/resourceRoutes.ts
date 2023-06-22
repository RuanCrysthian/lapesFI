import express from 'express';
import { ResourceController } from '../controllers/resourceController';

const router = express.Router();

router.post('/', ResourceController.createResource);

export default router;
