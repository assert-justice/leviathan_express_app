import { Request, Response, NextFunction } from "express";
import service from './instance.service';
import locationService from '../locations/location.service';
import { initLocationData, LocationData } from "../../game_logic/location_data";

function instanceExists(req: Request, res: Response, next: NextFunction){
    const {instanceId} = req.params;
    const instance = service.readInstance(instanceId);
    if(instance) {
        res.locals.instance = instance;
        next();
    }
    else{
        next(400);
    }
}

function readInstance(req: Request, res: Response){
    const data = res.locals.instance;
    res.send(data);
}

async function listInstances(req: Request, res: Response){
    const data = await service.listInstances();
    res.send(data);
}

async function createInstance(req: Request, res: Response){
    let instance = await service.createInstance();
    const locationData = initLocationData('galaxy', 'galaxy');
    locationData.instance_id = instance.instance_id;
    const location = await locationService.createLocation(locationData);
    
    await service.updateInstance(instance.instance_id, location.location_id ?? '');
    // there is probably a better way to do this
    res.send(await service.readInstance(instance.instance_id));
}

export default {
    read: [instanceExists, readInstance],
    create: createInstance,
    list: listInstances,
};