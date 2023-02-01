import express from 'express';
const router = express.Router();
export default router;
import db from '../db/connect';
import { Request, Response } from "express";

async function reset(req: Request, res: Response){
    await db.raw('TRUNCATE locations RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE blobs RESTART IDENTITY CASCADE');
    await db.raw('TRUNCATE instances RESTART IDENTITY CASCADE');

    res.sendStatus(200);
}

router.get('/', reset);