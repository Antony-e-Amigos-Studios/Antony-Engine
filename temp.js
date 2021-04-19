
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
        this.tile_w = dim.w / this.w;
        this.tile_h = dim.h / this.h;
    }

    generateMap() {
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) {
                for (let key of this.tileManager.options()) {
                    if (this.map[i][j] == key) {
                        this.map[i][j] = new Tile(this.tileManager.get(key).texture);
                        this.map[i][j].x = i * tile_w;
                        this.map[i][j].y = j * tile_h;
                    }
                }
                if (!(this.map[i][j] instanceof Tile)) {
                    this.map[i][j] = null;
                }
            }
        }
    }

    draw(ctx) {
        // aqui vc usa o valor do "key" pra pegar o new Tile que 
        // ele tem e desenhar na tela a partir de alguma função que 
        // a classe Tile tenha pra desenhar na tela e dpois fazer a parada multiplicado pela 
        // constante de sla oq grande dia 👍
        for (let i = 0; i < this.w; i++) {
            for (let j = 0; j < this.h; j++) { // olha que tesão esses { se alinhando
                if (this.map[i][j] !== null) {
                    this.map[i][j].draw(ctx);
                }
            }
        }
    }
}

// main.js tipo isso


var tileManager = new TileManager();

var sprt_tile1 = new Sprite("tile1.png", (img) => {
    tileManager.set(1, new Tile(img, "grama"));
});

var mapMatrix = [
    [1, 1, 1],
    [0, 0, 0],
    [1, 0, 0]
]

var mapa = new Map(mapMatrix, tileManager, game);

mapa.generateMap();