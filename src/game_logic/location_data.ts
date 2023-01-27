export interface LocationData{
    name: string,
    instance_id: string,
    location_id?: string,
    parent_id: string | null, 
    type: string,
    properties: string,
    position: string,
    blob_id: string,
    initialized: boolean,
}

export function validateLocationData(data: any): LocationData | null{
    return null;
}