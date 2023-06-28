import express from 'express';
import { ErrorController } from '../controllers/errorController';

const router = express.Router();

router.post('/', ErrorController.create);
router.get('/', ErrorController.getAllErrors);
router.get('/:uuid', ErrorController.getErrorByUUID);

export default router;
