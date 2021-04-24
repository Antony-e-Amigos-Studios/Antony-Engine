import Component from './Component.js'
import Tile from "./Tile.js"

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
    constructor(map, tileManager, tilesize = 64) {
        this.map = map;
        this.w = map[0].length;
        this.h = map.length;
        this.tileManager = tileManager;
        this.tilesize = tilesize;
        this.has_camera = false;
    }

    generateMap() {
        for (let i = 0; i < this.h; i++) {
            for (let j = 0; j < this.w; j++) {
                let current_tile = this.tileManager.get(this.map[i][j]);
                if (current_tile) {
                    this.map[i][j] = new Tile(current_tile.texture);
                    this.map[i][j].setScale(this.tilesize+1, this.tilesize+1);
                    this.map[i][j].x = j * this.tilesize;
                    this.map[i][j].y = i * this.tilesize;
                } else {
                    this.map[i][j] = null;
                }
            }
        }
    }

    update(ctx) {
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

class EmptyComponent {
    update(){
        
    }
}

class Camera extends Component {
    constructor(width, height, target, speed) {
        super();
        this.target = target;
        target.add_component("camera", new EmptyComponent());
        this.x = 0;
        this.y = 0;
        this.speed = speed / 10 % 1;
    }

    apply(entity) {
        entity.move(this.x, this.y);
    }

    lerp(v0, v1, t) {
        return v0 + t * (v1 - v0);
    }

    update(ctx, game) {
        this.x = this.lerp(this.x, this.target.x-(game.width/2-this.target.w/2), this.speed);
        this.y = this.lerp(this.y, this.target.y-(game.height/2-this.target.h/2), this.speed);
        this.x = Math.min(this.x, 0);
        this.y = Math.min(this.y, 0);
        game.get_current_scene().map.apply_to_all(this.apply.bind(this));
    }
}

export {Camera, Map, TileManager};