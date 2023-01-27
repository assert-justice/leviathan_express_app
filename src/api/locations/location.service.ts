import db from '../../db/connect';
import { LocationData } from '../../game_logic/location_data';

function readLocation(id: string): any{
    // const data: any = {root: id, locations: {}};
    // const getLocation = (id:string): LocationData => {
    //     data.locations[id] = locations[id].data;
    //     return locations[id].data as LocationData;
    // }
    // const location = getLocation(id);
    // for (const childId of location.childIds) {
    //     getLocation(childId);
    // }
    // return data;
}

async function createBlob(blob_data: string){
    const blob = await db('blobs').insert({blob_data}, '*');
    return blob[0];
}

async function updateBlob(blob_id: string, blob_data: string){
    await db('blobs').where({blob_id}).update({blob_data});
}

async function createLocation(data: LocationData){
    //
    const {blob_id} = await createBlob('{}');
    data.blob_id = blob_id;
    const location = await db('locations').insert(data, '*');
    return location[0];
}

export default {
    readLocation,
    createLocation,
    updateBlob,
};