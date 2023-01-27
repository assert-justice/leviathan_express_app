import express from 'express';
import controller from './instance.controller';
const router = express.Router();
export default router;

// router.get('/:instanceId', controller.read);
router.get('/', controller.create);