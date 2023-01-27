import express from 'express';
import controller from './location.controller';
const router = express.Router();
export default router;

router.get('/:locationId', controller.read);