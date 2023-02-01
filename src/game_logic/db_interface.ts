import { LocationData } from "./location_data";

export type CreateLocationFn = (data: LocationData | LocationData[]) => any;

export type UpdateBlobFn = (blob_id: string, blob_data: string)=>any;

export type InitLocationFn = (data: LocationData, 
    createLocation: CreateLocationFn,
    updateBlob: UpdateBlobFn) => Promise<LocationData>;