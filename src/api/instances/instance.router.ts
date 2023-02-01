import express from 'express';
import controller from './instance.controller';
const router = express.Router();
export default router;

router.get('/', controller.list);
router.post('/', controller.create);
