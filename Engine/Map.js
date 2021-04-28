/**
 * gustavo é furry
 */
import Component from "./Component.js"
import Tile from "./Tile.js"

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
    constructor(map, tileManager, tilesize = 64) {
        this.map = map;
        this.w = map[0].length;
        this.h = map.length;
        this.tileManager = tileManager;
        this.tilesize = tilesize;
        this.has_camera = false;
        this.entitys = []
        this.game
    }

    LoadGame(game){
        this.game = game
    }

    generateMap() {
        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                let current_tile = this.tileManager.get(this.map[i][j]);
                if (current_tile) {
                    this.map[i][j] = new Tile(current_tile.texture);
                    this.map[i][j].setScale(this.tilesize, this.tilesize);
                    this.map[i][j].x = j * this.tilesize;
                    this.map[i][j].y = i * this.tilesize;
                } else {
                    this.map[i][j] = null;
                }
            }
        }
    }

    generateEntitys(ctx){
        this.entitys.forEach(e => {
            e.update(this.game)
            e.position_update()
            e.update_components(ctx)
        })
    }

    add_entity(entity){
        this.entitys.push(entity)
    }

    add_entitys(...entity){
        entity.forEach(e => {
            this.entitys.push(e)
        })
    }

    update(ctx) {
        this.generateEntitys(ctx)

        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                if (this.map[i][j] !== null && this.map[i][j] instanceof Tile) {
                    if (!this.has_camera) {
                        this.map[i][j].position_update();
                    }
                    this.map[i][j].update_components(ctx);
                }
            }
        }
    }

    enable_camera() {
        this.has_camera = true;
    }

    apply_to_all(f) {
        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                if (this.map[i][j] !== null && this.map[i][j] instanceof Tile) {
                    f(this.map[i][j]);
                }
            }
        }
    }
}

class DataComponent {
    constructor(info) {
        this.info = info;
    }

    update(){
        
    }
}

class Camera extends Component {
    constructor(width, height, target) {
        super();
        this.target = target;
        this.x = 0;
        this.y = 0;
        this.w = width
        this.h = height
    }

    lerp(v0, v1, t) {
        return (1 - t) * v0 + t * v1;
    }

    update(_ctx, game) { // a va toma no cu fodase ta consertado isso q import vadia gasosoa
        // acabou, fim, caso encerrado, voltem para as suas casas
        if (this.target.y > game.height/2) {
            this.y = this.lerp(this.y, this.target.y - Math.round(game.height / 2), 0.1); // 
        }
        if (this.target.x > game.width/2) {
            this.x = this.lerp(this.x, this.target.x-Math.round(game.width/2), 0.1);
        }
        
        for (let i = 0; i < game.get_current_scene().layers.length; i++) {
            game.get_current_scene().layers[i].apply_to_all(this.apply.bind(this));
            game.apply_to_all_entities(this.apply.bind(this));
        }
    }

    apply(entity) {
        entity.move(this.x, this.y);
        entity.skip_next_position_update();
    }
}

export { TileManager, Map, Camera, DataComponent };