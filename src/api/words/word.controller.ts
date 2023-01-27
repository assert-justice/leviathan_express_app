import { Request, Response, NextFunction } from "express";
import service from './word.service';

async function list(req: Request, res: Response, next: NextFunction){
    const tagString = req.query.tags;
    if(!tagString){ next(400); return;}
    const tags = ('' + tagString).split(',');
    const words = await service.list(tags);
    res.send(words);
}

export default {
    list,
}