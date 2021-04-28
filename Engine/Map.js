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
        this.enabled = "both";
        this.done_x = false; // vou arrumar um jeito melhor de fazer isso dps
        this.done_y = false; 
        this.target.add_component("camera", new DataComponent({"enabled": "both"}));
    }

    lerp(v0, v1, t) {
        return (1 - t) * v0 + t * v1;
    }

    update(_ctx, game) {
        let execute = { "none": () => {},
                        "both": () => {
                            this.x = this.lerp(this.x, this.target.x, 0.1);
                            this.y = this.lerp(this.y, this.target.y, 0.1);
                        },
                        "x": () => this.x = this.lerp(this.x, this.target.x, 0.1),
                        "y": () => this.y = this.lerp(this.y, this.target.y, 0.1) };
                
        execute[this.enabled]();
                        // sim isso literalmente simula o match do rust

        for (let i = 0; i < game.get_current_scene().layers.length; i++) {
            game.get_current_scene().layers[i].apply_to_all(this.apply.bind(this));
        }

        if (this.target.x <= game.width/2) {
            this.disable('x');
        } else {
            this.enable('x');
        }

        if (this.target.y <= game.height/2) {
            this.disable('y');            
        } else {
            this.enable('y');
        }
    }

    apply(entity) {
        entity.move(this.x, this.y);
    }

    disable(option= "both") {
        let single = ['x', /* or */ 'y'];
        let enabled = this.target.get("camera").info["enabled"];
        
        let inverse = {"both": "none", "x": "y", "y": "x", "none": "none"}; // none remains none

        if (enabled == option) option = "none";
        else if (inverse[option] != enabled && enabled != "both") option = "none";
        else option = inverse[option];

        this.enabled = option;
        this.target.get("camera").info["enabled"] = option;
    }

    enable(option="both") {
        let single = ['x', /* or */ 'y'];
        let enabled = this.target.get("camera").info["enabled"];

        if (single.includes(option) &&    // se opção for x ou y
            single.includes(enabled) &&   // e x ou y já estiver ativado
            enabled != option)            // e se o excluido não for igual a opção
                option = "both";
        else if (option != enabled && enabled != "none") option = "both";

        this.enabled = option;
        this.target.get("camera").info["enabled"] = option;
    }
}

export { TileManager, Map, Camera, DataComponent };