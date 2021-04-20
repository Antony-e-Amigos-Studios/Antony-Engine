/**
 * gustavo é furry
 */
class TileManager {
    constructor(initial = {}) {
        this.mapper = initial;
    }

    get(name) {
        return this.mapper[name];
    }

    set(name, val) {
        this.mapper[name] = val;
    }

    options() {
        return Object.keys(this.mapper);
    }
}

class Map {
    constructor(map, tileManager, dim) {
        this.map = map;
        this.w = map[0].length;
        this.h = map.length;
        this.tileManager = tileManager;
        this.tile_w = dim.width / this.w;
        this.tile_h = dim.height / this.h;
    }

    generateMap() {
        for (var i = 0; i < this.h; i++) {
            for (var j = 0; j < this.w; j++) {
                let current_tile = this.tileManager.get(this.map[i][j]);
                if (current_tile) {
                    this.map[i][j] = new Tile(current_tile.texture);
                    this.map[i][j].x = j * this.tile_w;
                    this.map[i][j].y = i * this.tile_h;
                } else {
                    this.map[i][j] = null;
                }
                console.log(this.map[i][j]);
            }
        }
    }

    draw(ctx) {
        for (var i = 0; i < this.h; i++) {
            for (var j = 0; j < this.w; j++) { // olha que tesão esses { se alinhando
                if (this.map[i][j] !== null) {
                    this.map[i][j].draw(ctx);
                }
            }
        }
    }
}