import { InitLocationFn } from "../db_interface";
import { ClusterProperties } from "./init_cluster";

interface GalaxyProperties{
    //
}

interface GalaxyBlob{
    //
}

const init: InitLocationFn = (data, createLocation, updateBlob) => {
    // generate cluster map
    // clusters are on a hidden grid
    // start with Sol at position 0,0,0 & go from there
    // maybe use a hex grid under the hood?
    // initial expansion
    // basically a* where each cluster is weighted randomly
    // not all clusters exist
    const map = new HexGrid();

    return data;
}

export default init;