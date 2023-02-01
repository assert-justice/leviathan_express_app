import { InitLocationFn } from "../db_interface";
import { ClusterProperties } from "./init_cluster";
import { HexGrid, Vec3 } from '../hex_grid';
import { initLocationData } from "../location_data";

interface GalaxyProperties{
    //
}

interface GalaxyBlob{
    //
}

interface Cluster{
    name: string,
    weight: number,
}

const init: InitLocationFn = async (data, createLocation, updateBlob) => {
    // generate cluster map
    // clusters are on a hidden grid
    // start with Sol at position 0,0,0 & go from there
    // Confederate capital is at Corvus
    // maybe use a hex grid under the hood?
    // basically a* where each cluster is weighted by noise function
    // not all clusters exist
    // 
    // phases
    // 1. initial expansion, the empire expands in all directions prioritizing high value systems
    // 2. pick the rightmost system to be Corvus
    // 3. expand further as before
    // 4. rebellion. Expand from Corvus to form confederate core
    // 5. war. Confederacy continues to expand but with resistance. Less willing to settle new clusters.
    // 
    const map = new HexGrid<Cluster>();
    const minNeighbors = 2;
    const maxNeighbors = 5;
    map.set([0,0,0], {name: 'Sol', weight: 1});
    let open = new Set<string>([HexGrid.getKey([0,0,0])]);
    const closed = new Set<string>();

    while(closed.size < 10){
        let tempOpen: typeof open = new Set();
        for (const openKey of open) {
            // add cluster to map
            map.set(openKey, {name: 'Nero', weight: 1});
            for (const coord of HexGrid.getAdjCoords(HexGrid.getCoord(openKey))) {
                const str = HexGrid.getKey(coord);
                if(!closed.has(str) && !open.has(str)) tempOpen.add(str);
            }
            // add to closed
            closed.add(openKey);
        }
        open = tempOpen;
    }
    // console.log(closed);

    const clusters = [...closed].map(key => {
        const coord = HexGrid.getCoord(key);
        const {name} = map.get(key);
        const location = initLocationData(name, 'cluster', data.instance_id);
        location.parent_id = data.location_id ?? '';
        const hp = HexGrid.toCartesian(coord, 100);
        const pos = {
            x: hp[0],
            y: hp[1],
            z: hp[2],
        }
        // location.position = JSON.stringify(HexGrid.getRandomPoint(coord, 100));
        location.position = JSON.stringify(pos);
        return location;
    });

    await createLocation(clusters);
    
    // for (const key of closed) {
    //     await createLocation(location);
    // }

    return data;
}

export default init;