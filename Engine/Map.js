class GameMap {
    constructor(map, dim, lookup) {
        this.tilesize = dim.height/map.length;
        this.innerMap = [];

        this.entities = {};

        for (let key of Object.keys(lookup)) { // Object.keys -> dict.keys()
            if (lookup[key] instanceof Tile) {
                lookup[key].w = this.tilesize;
                lookup[key].h = this.tilesize;
            } else {
                this.entities[lookup[key].name] = ""; // uwu   
            }
        }
        
        let i = 0;
        let j = 0;
        for (let row of map) {
            this.innerMap.push([]);
            for (let col of row) {
                if (lookup[col] instanceof Tile) {
                    this.innerMap[i][j] = new Clone_Tile(lookup[col].clone());
                } else {
                    this.innerMap[i][j] = lookup[col];
                }
                j++;
            }
            i++;
        }
        console.log(this.innerMap);
    }
}