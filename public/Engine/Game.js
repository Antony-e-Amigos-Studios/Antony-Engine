/**
 * Antony Game Engine
 * @author Magoninho and Tsukiiii
 * @copyright Copyright (c) 2021 Antony e Amigos Studios. All rights reserved
 */
import { NonEntityGameObject } from "./GameObject.js";

export default class Game extends NonEntityGameObject {
    constructor() {
        super();
        this.xspd = 0;
        this.yspd = 0;
        this.entities = [];
        this.background = undefined;
        this.scenes = {};
        this.scene = "";
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d", { alpha: false });
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    draw(ctx) {
        if(!this.background) {
            ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
            ctx.fillRect(0, 0, this.width, this.height);
        } else {
            ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
            ctx.drawImage(this.background, 0, 0, this.width, this.height);
            ctx.imageSmoothingEnabled = false; // A LINHA MAIS MILAGROSA DO PROJETO
        }
    }

    setbg(img) {
        this.background = img;
    }

    gameLoop() {
        if (this === undefined) {
            return undefined;
        }
        this.update_components();
        this.draw(this.ctx); // apaguei essa linha sem qrer fds
        if (this.scene !== "") {
            this.get_current_scene().update(this.ctx);
        }
        for (let ent of this.entities) {
            ent.update(this);
            ent.position_update();
            ent.update_components(this.ctx);
        }
        
        window.requestAnimationFrame(this.gameLoop);
    }

    add_entity(entity) {
        this.entities.push(entity);
    }

    remove_entity(entity) {
        delete this.entities[entity]
    }

    create_scene(name, scene) {
        this.scenes[name] = scene;
    }

    get_current_scene(){
        if (this.scene !== "") {
            return this.scenes[this.scene];
        }
    }

    set_current_scene(name) {
        if (name in this.scenes) { // if key exists
            this.scene = name;
        }
    }

    center(entity) {
        return {x:(this.width/2 - entity.w/2) + entity.x,
                y:(this.height/2 - entity.h/2) + entity.y};
    }

    main() {
        this.canvas.style.border = "1px solid #000";

        document.body.appendChild(this.canvas);

        setInterval(this.gameLoop.bind(this), 1000 / 60);
    }
}