import express from 'express';
import { ErrorController } from '../controllers/errorController';

const router = express.Router();

router.post('/', ErrorController.create);

export default router;
