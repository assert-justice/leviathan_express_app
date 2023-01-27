import { Request, Response, NextFunction } from "express";
// import { LocationData } from "../data/locationData";
import service from './location.service';

async function locationExists(req: Request, res: Response, next: NextFunction){
    const {locationId} = req.params;
    const location = await service.readLocation(locationId);
    if(location) {
        res.locals.location = location;
        next();
    }
    else next(400);
    // if(service.locationExists(locationId)) next();
}

async function readLocation(req: Request, res: Response){
    const {location} = res.locals;
    return res.locals.location;
}

export default {
    read: [locationExists, readLocation],
};