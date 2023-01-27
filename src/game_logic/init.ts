import { InitLocationFn } from "./db_interface";
import init_galaxy from './init/init_galaxy';

const init: InitLocationFn = (data, createLocation, updateBlob) => {
    if(data.initialized) return data;
    data.initialized = true;
    const initializers = new Map([
        ['galaxy', init_galaxy],
    ]);
    const fn = initializers.get(data.type);
    if(!fn) return data;
    return fn(data, createLocation, updateBlob);
}

export default init;