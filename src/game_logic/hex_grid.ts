// Algos from https://www.redblobgames.com/grids/hexagons/

export type Vec3 = [number, number, number];

export class HexGrid<T>{
    data: Map<string, T>;
    private static sep: string = ',';
    constructor(){
        this.data = new Map();
    }
    static getKey(coord: Vec3): string{
        coord = HexGrid.normalizeCoord(coord);
        return coord.join(HexGrid.sep);
    }
    static getCoord(key: string): Vec3{
        const temp = key.split(HexGrid.sep).map(Number);
        const [x,y,z] = temp;
        return [x, y, z];
    }
    private static normalizeCoord(coord: Vec3): Vec3{
        return coord;
    }
    get(coord: Vec3): T{
        const key = HexGrid.getKey(coord);
        const val = this.data.get(key);
        if(!val) throw `'${key}' is not a valid key!`;
        return val;
    }
    set(coord: Vec3, val: T){
        this.data.set(HexGrid.getKey(coord), val);
    }
    nodeExists(coord: Vec3){
        const key = HexGrid.getKey(coord);
        return this.data.has(key);
    }
    static getAdjCoords(coord: Vec3): Vec3[]{
        // var cube_direction_vectors = [
        //     Cube(+1, 0, -1), Cube(+1, -1, 0), Cube(0, -1, +1), 
        //     Cube(-1, 0, +1), Cube(-1, +1, 0), Cube(0, +1, -1), 
        // ]
        const dirs: Vec3[] = [
            [1,0,-1],
            [1,-1,0],
            [0,-1,1],
            [-1,0,1],
            [-1,1,0],
            [0,1,-1],
        ];
        const [cx, cy, cz] = coord;
        return dirs.map(([dx,dy,dz]):Vec3 => {
            return [cx + dx, cy + dy, cz + dz];
        });
    }
    getNeighbors(coord: Vec3): [Vec3, T][]{
        const coords = HexGrid.getAdjCoords(coord).filter(this.nodeExists);
        return coords.map((coord) => {
            return [coord, this.get(coord)];
        });
    }
    static toCartesian(coord: Vec3, radius: number): Vec3{
        // assumes "flat top" orientation.
        // function flat_hex_to_pixel(hex):
        //     var x = size * (     3./2 * hex.q                    )
        //     var y = size * (sqrt(3)/2 * hex.q  +  sqrt(3) * hex.r)
        //     return Point(x, y)
        const [q, r] = coord;
        const root3 = Math.sqrt(3);
        const x = radius * (3 / 2 * q);
        const y = radius * (root3 / 2 * q + root3 * r);
        return [x, y, 0];
    }
    static getRandomPoint(coord: Vec3, radius: number): Vec3{
        const [cx, cy] = HexGrid.toCartesian(coord, radius);
        radius *= Math.sqrt(3);
        let [rx, ry] = [1, 1];
        do{
            [rx, ry] = [
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
            ];
        }
        while(rx * rx + ry * ry > 1);
        return [rx * radius + cx, ry * radius + cy, 0];
    }
}