import { Request, Response, NextFunction } from "express";
import init from "../../game_logic/init";
import { LocationData } from "../../game_logic/location_data";
import service from './location.service';

async function locationExists(req: Request, res: Response, next: NextFunction){
    const {locationId} = req.params;
    const location = await service.readLocation(locationId);
    
    if(location) {
        res.locals.location = location;
        next();
    }
    else next({status: 400, message: `No location with id ${locationId} exists!`});
    // if(service.locationExists(locationId)) next();
}

async function readLocation(req: Request, res: Response){
    let location = res.locals.location as LocationData;
    location = await init(location, service.createLocation, service.updateBlob);
    const children = await service.readLocationChildren(location.location_id ?? '');
    res.send({...location, children});
}

export default {
    read: [locationExists, readLocation],
};