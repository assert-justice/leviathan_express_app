import db from '../../db/connect';
import { LocationData } from '../../game_logic/location_data';

async function readLocation(location_id: string): Promise<LocationData>{
    return db('locations').select('*').where({location_id}).first().then(data => data as LocationData);
}

async function readLocationChildren(location_id: string): Promise<LocationData[]>{
    return db('locations').select('*').where({parent_id: location_id});
}

async function readBlob(blob_id: string){
    return db('blobs').where({blob_id}).select('*');
}

async function updateBlob(blob_id: string, blob_data: string){
    await db('blobs').where({blob_id}).update({blob_data});
}

async function updateLocation(location: LocationData){
    const {location_id} = location;
    await db('locations').where({location_id}).update(location);
}

async function createLocation(data: LocationData | LocationData[]): Promise<LocationData>{
    if(!Array.isArray(data)){
        data = [data];
    }
    const blobData = new Array<string>(data.length)
        .fill('{}')
        .map(blob_data=>({blob_data}));
    const blobs = await db('blobs').insert(blobData, '*');
    for (let i = 0; i < data.length; i++) {
        data[i].blob_id = blobs[i].blob_id;
    }
    const location = await db('locations').insert(data, '*');
    return location[0];
}

export default {
    readLocation,
    updateLocation,
    createLocation,
    readBlob,
    updateBlob,
    readLocationChildren
};