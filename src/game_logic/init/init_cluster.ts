import { InitLocationFn } from "../db_interface";

export interface ClusterProperties{
    //
}

interface ClusterBlob{
    //
}

const init: InitLocationFn = async (data, createLocation, updateBlob) => {
    return data;
}

export default init;