export interface LocationData{
    name: string,
    instance_id?: string,
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

export function initLocationData(name: string, type: string, instance_id?: string): LocationData{
    return {
        name,
        instance_id,
        // location_id?: string,
        parent_id: null, 
        type,
        properties: '{}',
        position: '[0,0,0]',
        blob_id: '',
        initialized: false,
    }
}