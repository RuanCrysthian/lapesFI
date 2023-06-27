import express from 'express';
import { ErrorController } from '../controllers/errorController';

const router = express.Router();

router.post('/', ErrorController.create);
router.get('/', ErrorController.getAllErrors);

export default router;
